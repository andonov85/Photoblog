import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

// import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: '90vh'
  },
	paper: {
    width: 500,
    height: '100%',
    backgroundColor: '#ebfaf9'
	}
});

function About(props) {
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography align='center'>
          About author
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(About);
