import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    borderRadius: 'unset',
    boxShadow: 'none',
  },
  header: {
    padding: 0
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
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar alt={comment.userName} src={comment.imageUrl} className={classes.avatar} />
            }
            title={comment.userName}
            subheader={comment.date}
            className={classes.header}
          />
          <CardContent>
            <Typography component="p">{comment.content}</Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);