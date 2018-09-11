import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NavLink from './NavLink';

const styles = theme => ({
  root: {
    // flexGrow: 1,
  },
  flexLogo: {
    flexGrow: 1
  },
  flexMenuItems: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  appbar: {
    boxShadow: 'none',
    borderBottom: "solid 1px"
  }
});

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appbar}>
        <Toolbar>
          <Typography variant="title" className={classes.flexLogo}>
            <NavLink to="/main" buttonName="Andon Andonov Photography" />
          </Typography>
          <div className={classes.flexMenuItems}>
          <NavLink to="/about" buttonName="About" />
          <NavLink to="/gallery" buttonName="Gallery" />
          <NavLink to="/blog" buttonName="Blog" />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
