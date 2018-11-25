import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import AdminTools from '../blog/AdminTools';
import { UserContext } from '../../App';

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
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -7,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'left',
    }
  },
  logoPart1: {
    color: 'black',
    fontFamily: 'Great Vibes, cursive',
    position: 'relative',
    zIndex: 1300,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  logoPart2: {
    color: 'grey',
    fontFamily: 'Abril Fatface, cursive',
    marginLeft: -68,
    marginTop: 27,
    position: 'relative',
    zIndex: 1200,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    }
  },
  adminTools: {
    position: 'absolute',
    top: 3,
    marginLeft: '25%',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '57.5%',
    },
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

    return (
      <div className={classes.root} >
        <AppBar position="static" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h4" align="center" className={classes.logoPart1}>
              AAndonov
              </Typography>
            <Typography variant="h5" align="center" className={classes.logoPart2}>
              Photography
              </Typography>
            <UserContext.Consumer>
              {user => user && user.role === 'admin' ?
                <div className={classes.adminTools}>
                  <AdminTools />
                </div> : null}
            </UserContext.Consumer>
            {this.props.children}
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
