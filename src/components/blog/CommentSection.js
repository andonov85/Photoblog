import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../Firebase';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Comment from './Comment';

const styles = theme => ({
  paper: {
    borderRadius: 'none',
    boxShadow: 'none',
  },
});

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      subcomments: [],
    };
  }

  componentDidMount() {
    const { postId } = this.props;
    const db = firebase.firestore();
    
    this.unsubscribeComments = db.collection('comments')
      .where('postId', '==', postId)
      .orderBy('date', 'asc')
      .onSnapshot((snapshot) => {
        let comments = [];
        snapshot.forEach((comment) => {
          const { content, postId, userId, date, userName, imageUrl } = comment.data();
          comments.push({
            postId: postId,
            commentId: comment.id,
            content: content,
            date: date.toDate().toDateString() + '  ' + date.toDate().toLocaleTimeString(),
            userId: userId,
            userName: userName,
            imageUrl: imageUrl
          });
        });
        this.setState({
          comments: comments
        });
      });

    this.unsubscribeSubcomments = db.collection('subcomments')
      .where('postId', '==', postId)
      .orderBy('date', 'asc')
      .onSnapshot((snapshot) => {
        let subcomments = [];
        snapshot.forEach((subcomment) => {
          const { content, postId, commentId, userId, date, userName, imageUrl } = subcomment.data();
          subcomments.push({
            postId: postId,
            commentId: commentId,
            subcommentId: subcomment.id,
            content: content,
            date: date.toDate().toDateString() + '  ' + date.toDate().toLocaleTimeString(),
            userId: userId,
            userName: userName,
            imageUrl: imageUrl
          });
        });
        this.setState({
          subcomments: subcomments,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribeComments();
    this.unsubscribeSubcomments();
  }

  render() {
    const { comments, subcomments } = this.state;
    const { classes, user } = this.props;

    return (
      <Paper className={classes.paper}>
        {comments.map((comment) => {
          return (
            <Comment className={classes.comments} key={comment.commentId} comment={comment} subcomments={subcomments} user={user} />
          )
        })
        }
      </Paper>
    )
  }
}

CommentSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentSection);