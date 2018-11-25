import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import Slide from '@material-ui/core/Slide';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '75vh'
  },
  paper: {
    display: 'flex',
    alignContent: 'flex-around',
    width: 500,
    height: '90%',
    marginTop: '2%',
    padding: 30,
    borderRadius: 6
  },
  bigAvatar: {
    width: 90,
    height: 90,
  },
  content: {
    padding: 20,

  }
});

function About(props) {
  const { classes } = props;

  return (
    <Fade in={true} timeout={{ enter: 400, exit: 0 }}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Slide timeout={500} direction="down" in={true} mountOnEnter unmountOnExit>
            <Avatar src={"https://lh6.googleusercontent.com/-wM6v0CfGZuc/AAAAAAAAAAI/AAAAAAAADeE/jK_FHbyfNdE/s96-c/photo.jpg"}
              aria-label="Avatar" className={classes.bigAvatar}>
            </Avatar>
          </Slide>
          <Typography className={classes.content} variant="h6" color='primary'>
            Hello, it's under construction yet. :)
          </Typography>
        </Paper>
      </div>
    </Fade>
  );
}

export default withStyles(styles)(About);
