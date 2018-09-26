import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

import NavLink from './NavLink';
import DrawerMenu from './DrawerMenu';

const styles = theme => ({
  appbar: {
    boxShadow: 'none',
    backgroundColor: '#f5f5f5',
  },
  toolbar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: 45,
    height: 45
  },
  logoImg: {
    height: 40
  }
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Hidden only={['xs', 'sm']}>
            <NavLink to="/main" buttonName="Home" />
            <NavLink to="/blog" buttonName="Blog" />
            <NavLink to="/gallery" buttonName="Gallery" />
            <NavLink to="/about" buttonName="About" />
          </Hidden>            
          <Hidden only={['md', 'lg', 'xl']}>
            <DrawerMenu />
          </Hidden>
        </Toolbar>
      </AppBar>
      </div>
  );
}
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth()
)(NavBar);
