import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    projectId: "aaphotography-b504f"
};
firebase.initializeApp(config);

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
                    thumbFileUrl: image.thumbFileUrl,
                    category: image.category,
                    description: image.description
                });
            });
            resolve(images);
        });
    });
}

export default imageSource;
