import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: process.env.REACT_APP_GOOGLE_apiKey,
  authDomain: process.env.REACT_APP_GOOGLE_authDomain,
  databaseURL: process.env.REACT_APP_GOOGLE_databaseURL,
  projectId: process.env.REACT_APP_GOOGLE_projectId,
  storageBucket: process.env.REACT_APP_GOOGLE_storageBucket,
  messagingSenderId: process.env.REACT_APP_GOOGLE_messagingSenderId
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export { firebase };