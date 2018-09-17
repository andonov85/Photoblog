import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    projectId: "aaphotography-b504f"
};
firebase.initializeApp(config);

export default firebase;