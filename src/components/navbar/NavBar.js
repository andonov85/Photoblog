import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

import NavLink from './NavLink';
import DrawerMenu from './DrawerMenu';

const styles = theme => ({
  appbar: {
    boxShadow: 'none',
    backgroundColor: 'black',
  },
  toolbar: {
    minHeight: 45,
    height: 45
  },
  logoImg: {
    height: 40
  },
  flexLogo: {
    flexGrow: 1
  }
});

class NavBar extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" className={classes.flexLogo}>
            <img src="logo/logo-black-bg.jpg" alt="Logo" className={classes.logoImg} />
          </Typography>
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
