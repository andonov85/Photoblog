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
  subcomments: {
    paddingLeft: 50
  }
});

class CommentSection extends React.Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Paper className={classes.paper}>
        {comments.map((comment) => {
          return (
            <div key={comment.commentId} className={classes.comments}>
              <Comment comment={comment} />
              <div className={classes.subcomments}>
                {comment.subcomments.map((subcomment, index) => {
                  return (
                    <Comment key={comment.commentId + index} comment={subcomment} />
                  )
                })
                }
              </div>
            </div>
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