import { firebase } from '../../Firebase';

function sortByDate(array) {
  return array.sort((a, b) => {
    return a.date.toDate() - b.date.toDate();
  }).map((el) => {
    el.date = el.date.toDate().toDateString();
    return el;
  });
}

function getUser(userId) {
  if (userId === undefined || typeof userId !== 'string') {
    return Error('Invalid userId');
  }

  return new Promise((resolve) => {
    const db = firebase.firestore();

    db.collection('users').doc(userId).get().then((user) => {
      if (user.exists) {
        resolve(user.data());
      } else {
        console.log("No such user!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  });
}

export { getUser, sortByDate };