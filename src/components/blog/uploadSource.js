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
	if (typeof googleUser === 'object' && googleUser.hasOwnProperty('googleId')) {
		// Form of google user object
		let user = {
			googleId: googleUser.googleId,
			email: 'none', // Otherwise googleUser.email,
			imageUrl: googleUser.imageUrl,
			name: googleUser.name,
			familyName: googleUser.familyName,
			givenName: googleUser.givenName,
			role: '', // User or admin
		};

		return new Promise((resolve) => {
			const users = firebase.firestore().collection('users');

			users.where('googleId', '==', user.googleId).get().then((snapshot) => {
				if (snapshot.empty) {
					// If doesnt exist add new user
					// Change role
					user.role = 'user';

					users.add(user).then((doc) => {
						// Add new doc id to user object
						user.userId = doc.id;
						resolve(user);
					})
						.catch(function (error) {
							console.error("Error adding document: ", error);
						});
				} else {
					// If exist update user data.
					const userId = snapshot.docs[0].id;

					users.doc(userId)
						.update({
							name: user.name,
							familyName: user.familyName,
							givenName: user.givenName,
							imageUrl: user.imageUrl
						})
						.then(() => {
							users.doc(userId).get().then((doc) => {
								let userObj = doc.data();
								// Add doc id to user object
								userObj.userId = doc.id;
								resolve(userObj);
							});
						});
				}
			}).catch(function (error) {
					console.log("Error getting document:", error);
				});
		});
	}
}

export { uploadComment, setUser };