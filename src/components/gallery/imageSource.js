import firebase from '../../Firebase';

function imageSource() {
    const db = firebase.firestore();

    return new Promise((resolve) => {
        let images = [];

        db.collection('images').get().then((snapshot) => {
            let num = 0;
            const ALL_COLS = 4;

            snapshot.forEach((doc) => {
                const image = doc.data();
                images.push({
                    id: image.id,
                    name: image.name,
                    url: image.url,
                    thumbUrl: image.thumbUrl,
                    category: image.category,
                    description: image.description,
                    cols: Math.floor(Math.random() * 2 + 1)
                });
                num += images[images.length - 1].cols;
                if (num > ALL_COLS) {
                    images[images.length - 1].cols = 1;
                } else if (num === ALL_COLS) {
                    num = 0;
                }
            });
            resolve(images);
        });
    });
}

export default imageSource;
