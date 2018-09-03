import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// import Grid from '@material-ui/core/Grid';

const styles = {
	root: {

	}
};

function About(props) {
	// const { classes } = props;
  return (
    <div>
      <Paper>About me</Paper>
    </div>
  );
}

export default withStyles(styles)(About);