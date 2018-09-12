import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NavLink from './NavLink';
import DrawerMenu from './DrawerMenu';
import './navbar.css';

const styles = theme => ({
  root: {
    
  },
  appbar: {
    boxShadow: 'none',
    borderBottom: "solid 1px"
  },
  flexLogo: {
    flexGrow: 1,
    fontFamily: 'Courgette, cursive'
  },
  flexMenuItems: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  shortMenu: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appbar}>
        <Toolbar>
          <Typography variant="title" className={classes.flexLogo}>
            Andon Andonov Photography
          </Typography>
          <div className={classes.flexMenuItems}>
            <NavLink to="/main" buttonName="Home" />
            <NavLink to="/blog" buttonName="Blog" />
            <NavLink to="/gallery" buttonName="Gallery" />
            <NavLink to="/about" buttonName="About" />
          </div>
          <div className={classes.shortMenu}>
            <DrawerMenu />
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