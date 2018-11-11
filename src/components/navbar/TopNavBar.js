import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import AdminTools from '../blog/AdminTools';
import { UserContext } from '../../App';
// import IconButton from '@material-ui/core/IconButton';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    boxShadow: 'none',
    backgroundColor: 'white',
    borderBottom: '1px #dbdbdb solid'
  },
  logo: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      fontSize: 20,
    },
    flexGrow: 1,
    fontFamily: 'Abril Fatface, cursive',
    color: 'grey'
  },
  adminTools: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: '62.5%',
    },
    position: 'absolute',
    marginLeft: '78%',
  }
});

class TopNavBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    // const { auth, anchorEl } = this.state;
    // const open = Boolean(anchorEl);

    return (
      <div className={classes.root} >
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
              <Typography variant="h4" align="center" className={classes.logo}>
                AA Photography
              </Typography>
              <UserContext.Consumer>
                {user => user && user.role === 'admin' ? <div className={classes.adminTools}><AdminTools/></div> : null}
              </UserContext.Consumer>
              {this.props.children}
            {/* <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            > */}
            {/* </IconButton> */}
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
  withWidth()
)(TopNavBar);
