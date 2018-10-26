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

		users.where('googleId', '==', googleUser.googleId).get().then((user) => {
			if (user.docs.length === 0) {
				// If doesnt exist add new user
				googleUser.email = 'none';
				googleUser.role = 'user';
				users.add(googleUser).then((addedUser) => {
					addedUser.get().then((newUser) => {
						let user = newUser.data();
						user.userId = newUser.id;
						resolve(user);
					});
				}).catch(function (error) {
					console.error("Error adding document: ", error);
				});
			} else {
				// If exist check for changes and update user data if needed.
				const userId = user.docs[0].id;
				const { name, familyName, givenName, imageUrl } = googleUser;

				users.doc(userId).update({
					name: name,
					familyName: familyName,
					givenName: givenName,
					imageUrl: imageUrl
				}).then(() => {
					users.doc(userId).get().then((updatedUser) => {
						let user = updatedUser.data();
						user.userId = updatedUser.id;
						resolve(user);
					});
				});
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});
}

export { uploadComment, setUser };