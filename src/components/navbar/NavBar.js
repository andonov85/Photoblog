import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import NavLink from './NavLink';

const styles = theme => ({
  root: {
    height: 45
  },
  fixed: {
    top: -45,
    transition: 'top .4s ease-in-out',
  },
  fixedOpen: {
    position: 'fixed',
    width: '100%',
    zIndex: 1,
    top: 0
  },
  appbar: {
    boxShadow: 'none',
    backgroundColor: 'white',
  },
  toolbar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: 45,
    height: 45,
    padding: 0
  },
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.rootEl = React.createRef();
    this.beforeScrolling = {};

    this.state = {
      isFixed: false,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const rootEl = this.rootEl.current;
    const rootRect = rootEl.getBoundingClientRect();

    if (rootRect.bottom + 50 < this.beforeScrolling.top) {
      this.setState({
        isFixed: true
      });
    } else if (rootRect.bottom >= this.beforeScrolling.top) {
      this.setState({
        isFixed: false
      });
    }
  }

  componentDidMount() {
    const rootEl = this.rootEl.current;
    this.beforeScrolling = rootEl.getBoundingClientRect();

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { classes } = this.props;
    const { isFixed } = this.state;

    return (
      <div className={classes.root} ref={this.rootEl}>
        <div className={classnames(classes.fixed, { [classes.fixedOpen]: isFixed })}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <NavLink to="/main" buttonName="Home" />
              <NavLink to="/blog" buttonName="Blog" />
              <NavLink to="/gallery" buttonName="Gallery" />
              <NavLink to="/about" buttonName="About" />
            </Toolbar>
          </AppBar>
        </div>
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
