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
                images.push({
                    id: doc.data().id,
                    name: doc.data().name,
                    url: doc.data().url,
                    thumbFileUrl: doc.data().thumbFileUrl,
                    category: doc.data().category,
                    description: doc.data().description
                });
            });
            resolve(images);
        });
    });
}

export default imageSource;
