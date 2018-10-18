import React from 'react';
import PropTypes from 'prop-types';

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
  render() {
    const { classes, comments, user } = this.props;
    return (
      <Paper className={classes.paper}>
        {comments.map((comment) => {
          return (
            <Comment className={classes.comments} key={comment.commentId} comment={comment} user={user}/>
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