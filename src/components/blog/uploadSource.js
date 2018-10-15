import { firebase } from '../../Firebase';

function uploadComment(comment) {
	const db = firebase.firestore();
	db.collection('comments').add(comment).then((addedComment) => {
		
	}).catch(function (error) {
			console.error("Error adding document: ", error);
		});
}

function setUser(googleUser) {
	return new Promise((resolve) => {
		const users = firebase.firestore().collection('users');

		users.where('googleId', '==', googleUser.googleId).limit(1).get().then((user) => {
			if (user.docs.length === 1) {
				const userId = user.docs[0].id;
				const userData = user.docs[0].data();
				const { name, familyName, givenName, email, imageUrl } = userData;
				
				users.doc(userId).update({
					name: name,
					familyName: familyName,
					givenName: givenName,
					email: email,
					imageUrl: imageUrl
				}).catch(function (error) {
					// The document probably doesn't exist.
					console.error("Error updating document: ", error);
				});
				users.doc(userId).get().then((updatedUser) => {
					resolve(updatedUser.data());
				});
			} else {
				users.add(googleUser).then((addedUser) => {
					addedUser.get().then((newUser) => resolve(newUser.data()));
				}).catch(function (error) {
					console.error("Error adding document: ", error);
				});
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});
}

export { uploadComment, setUser };