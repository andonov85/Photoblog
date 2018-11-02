import { firebase } from '../../Firebase';

function imageSource() {
	return new Promise((resolve, reject) => {
		let images = [];

		const db = firebase.firestore();
		db.collection('images').get().then((snapshot) => {
			if (snapshot.empty) {
				reject('Firestore: Snapshot is empty');
			}
			snapshot.forEach((doc) => {
				const image = doc.data();
				images.push({
					id: image.id,
					name: image.name,
					url: image.url,
					thumbUrl: image.thumbUrl,
					category: image.category,
					description: image.description
				});
			});
			resolve(images);
		});
	});
}

export default imageSource;
