import firebase from '../../Firebase';

function imageSource() {
    const db = firebase.firestore();

    return new Promise((resolve) => {
        let images = [];

        db.collection('images').get().then((snapshot) => {
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
