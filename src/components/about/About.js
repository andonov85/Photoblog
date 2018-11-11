import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

// import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '80vh'
  },
  paper: {
    width: 500,
    height: '100%',
    marginTop: '2%',
    backgroundColor: '#ebfaf9'
  }
});

function About(props) {
  const { classes } = props;

  return (
    <Fade in={true} timeout={{ enter: 400, exit: 0 }}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h6" align='center'>
            About author
        </Typography>
        </Paper>
      </div>
    </Fade>
  );
}

export default withStyles(styles)(About);
