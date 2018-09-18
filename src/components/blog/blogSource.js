import firebase from '../../Firebase';

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

export default blogSource;
