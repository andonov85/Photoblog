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
  },
  fixedOpen: {
    position: 'fixed',
    width: '100%',
    opacity: .7,
    zIndex: 1,
    '&:hover': {
      opacity: 1,
    },
    transition: 'all .4s ease-in-out',
    top: 0,
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
    this.barEl = React.createRef();
    this.initialPosition = {};

    this.state = {
      isFixed: false,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const rootEl = this.rootEl.current;
    const barEl = this.barEl.current;

    const rootRect = rootEl.getBoundingClientRect();
    const hasFixedOpenClass = barEl.classList.contains(this.props.classes.fixedOpen);
    
    if (!hasFixedOpenClass && rootRect.bottom <= 0) {
      this.setState({
        isFixed: true
      });
    } else if (hasFixedOpenClass && rootRect.bottom >= this.initialPosition.top) {
      this.setState({
        isFixed: false
      });
    }
  }

  componentDidMount() {
    const rootEl = this.rootEl.current;
    this.initialPosition = rootEl.getBoundingClientRect();
    
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
        <div className={classnames(classes.fixed, { [classes.fixedOpen]: isFixed })} ref={this.barEl}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
              <NavLink to="/main" buttonName="Home" />
              <NavLink to="/gallery" buttonName="Gallery" />
              <NavLink to="/blog" buttonName="Blog" />
              <NavLink to="/newsfeed" buttonName="News Feed" />
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
