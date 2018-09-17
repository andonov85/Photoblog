import firebase from '../../Firebase';

function blogSource() {
    const db = firebase.firestore();

    return new Promise((resolve) => {
        let blogPosts = [];

        db.collection('blog').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                const post = doc.data();
                blogPosts.push({
                    linkUrl: post.linkUrl,
                    avatarUrl: post.avatarUrl,
                    imageUrl: post.imageUrl,
                    title: post.title,
                    content: post.content,
                    data: post.data
                });
            });
            resolve(blogPosts);
        });
    });
}

export default blogSource;
