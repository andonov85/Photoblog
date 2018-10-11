import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Comment from './Comment';
import { getComments } from './blogSource';

const styles = theme => ({
  paper: {

  },
  subcomments: {
    paddingLeft: 20
  }
});

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    getComments(this.props.postId).then((comments) => {
      this.setState({
        comments: comments
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { comments } = this.state;

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