import { firebase } from '../../Firebase';

function uploadComment(collection, comment) {
	const db = firebase.firestore();
	db.collection(collection)
		.add(comment)
		.then(commentRef => {
			const postRef = db.collection('blog').doc(comment.postId);
			db.runTransaction((t) => {
				return t.get(postRef).then((post) => {
					let newCommentsCounter = post.data().commentsCounter + 1;
					t.update(postRef, { commentsCounter: newCommentsCounter });
				});
			}).then(result => {

			}).catch(err => {
				console.log('Transaction "+1 comment" failure:', err);
			});
		})
		.catch(function (error) {
			console.error("Error adding comment: ", error);
		});
}

function setUser(googleUser) {
	return new Promise((resolve) => {
		const users = firebase.firestore().collection('users');

		users.where('googleId', '==', googleUser.googleId).limit(1).get().then((user) => {
			if (user.docs.length === 1) {
				const userId = user.docs[0].id;
				const userData = user.docs[0].data();
				const { name, familyName, givenName, imageUrl } = userData;

				users.doc(userId).update({
					name: name,
					familyName: familyName,
					givenName: givenName,
					//email: email,
					imageUrl: imageUrl
				}).catch(function (error) {
					// The document probably doesn't exist.
					console.error("Error updating document: ", error);
				});
				users.doc(userId).get().then((updatedUser) => {
					resolve(updatedUser.data());
				});
			} else {
				googleUser.email = 'none';
				googleUser.role = 'user';
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