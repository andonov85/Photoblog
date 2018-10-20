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

function getPosts(searched) {
  let regex = '';
  if (searched) {
    searched = searched.match(/[\w\d]+/gi) ? searched.match(/[\w\d]+/gi).join(' ') : '';
    regex = new RegExp(searched, 'i');
  }

  return new Promise((resolve) => {
    const db = firebase.firestore();
    let blogPosts = [];

    db.collection('blog').orderBy('date', 'desc').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const post = doc.data();
        let found = false;

        Object.values(post).forEach((value) => {
          if (!found && typeof value === 'string') {
            found = value.search(regex) === -1 ? false : true;
          }
        });

        if (found || searched === '') {
          blogPosts.push({
            postId: doc.id,
            homepageUrl: post.homepageUrl,
            linkUrl: post.linkUrl,
            avatarUrl: post.avatarUrl,
            imageUrl: post.imageUrl,
            title: post.title,
            content: post.content,
            date: post.date.toDate().toDateString()
          });
        }
      });
      resolve(blogPosts);
    })
  });
}

export { getPosts, getUser, sortByDate };