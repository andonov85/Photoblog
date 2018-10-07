import { firebase } from '../../Firebase';

function searchInPosts(searched) {
    const db = firebase.firestore();
    searched = searched.match(/[\w\d]+/gi) ? searched.match(/[\w\d]+/gi).join(' ') : '';
    const regex = new RegExp(searched, 'i');
    
    return new Promise((resolve) => {
      let blogPosts = [];

      db.collection('blog').orderBy('date', 'desc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const post = doc.data();
          let jsdate = new Date(post.date.toString());
          post.date =  jsdate.toDateString(); 

          let found = false;
          Object.values(post).forEach((value) => {
            if (!found && typeof value === 'string') {
              found = value.search(regex) === -1 ? false : true;
            }
          });
          
          if (found || searched === '') {
            blogPosts.push({
              homepageUrl: post.homepageUrl,
              linkUrl: post.linkUrl,
              avatarUrl: post.avatarUrl,
              imageUrl: post.imageUrl,
              title: post.title,
              content: post.content,
              date: post.date
            });
          }
        });
        resolve(blogPosts);
      });
    });
  }

  function blogSource() {
    const db = firebase.firestore();

    return new Promise((resolve) => {
      let blogPosts = [];

      db.collection('blog').orderBy('date', 'desc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const post = doc.data();
          let jsdate = new Date(post.date.toString());
          blogPosts.push({
            homepageUrl: post.homepageUrl,
            linkUrl: post.linkUrl,
            avatarUrl: post.avatarUrl,
            imageUrl: post.imageUrl,
            title: post.title,
            content: post.content,
            date: jsdate.toDateString()
          });
        });
        resolve(blogPosts);
      });
    });
  }

export default { searchInPosts, blogSource };