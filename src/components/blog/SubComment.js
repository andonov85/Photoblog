import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  card: {
    borderRadius: 'unset',
    boxShadow: 'none',
    borderLeft: '1px solid lightgrey'
  },
  paper: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    boxShadow: 'unset'
  },
  header: {
    padding: 0
  },
  avatar: {
    margin: 10,
  },
});

class SubComment extends React.Component {
  render() {
    const { classes, subcomment } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar alt={subcomment.userName} src={subcomment.imageUrl} className={classes.avatar} />
          }
          title={subcomment.userName}
          subheader={subcomment.date}
        />
        <CardContent>
          <Paper className={classes.paper}>
            <Typography component="p">{subcomment.content}</Typography>
          </Paper>
        </CardContent>
      </Card>
    )
  }
}

SubComment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubComment);