const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function imageDataObjects() {
    let imageDataObjects = [{
        id: 'img1',
        url: 'https://cdn.photographylife.com/wp-content/uploads/2016/06/Mass.jpg',
        category: 'waterscape'
    }, {
        id: 'img2',
        url: 'https://cdn.photographylife.com/wp-content/uploads/2015/06/Pier-Brooklyn-Bridge-Park.jpg',
        gategory: 'cityscape'
    }, {
        id: 'img3',
        url: 'https://cdn.photographylife.com/wp-content/uploads/2015/06/Antelope-Canyon-2445.jpg',
        category: 'landscape'
    }];

    

    return imageDataObjects;
}

export default imageDataObjects;