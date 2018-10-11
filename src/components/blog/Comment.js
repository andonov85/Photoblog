import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {

  },
  avatar: {
    margin: 10,
  },
});

class Comment extends React.Component {
  render() {
    const { classes, comment } = this.props;

    return (
      <div className={classes.root}>
        <Avatar alt={comment.userName} src={comment.imageUrl} className={classes.avatar}/>
        <Typography>{comment.userName}</Typography>
        <Typography>{comment.date}</Typography>
        <Typography>{comment.content}</Typography>
      </div>
    )
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);