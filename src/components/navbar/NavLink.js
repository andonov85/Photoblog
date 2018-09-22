import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  buttonsNavbar: {
    '&:hover': {
      borderBottom: '3px solid rgb(216, 168, 12)'
    },
    color: 'white',
    fontSize: 13,
    borderRadius: 0
  }
});

const NavLink = ({ classes, to, location, buttonName }) => {
  return (
    <Route path={to} children={({ match }) => (
      <Link type="button" replace={match === location.pathname} to={to} style={{textDecoration: "none"}}>
        <Button className={classes.buttonsNavbar}>{buttonName}</Button>
      </Link>
    )}/>
  )
}

NavLink.propTypes = {
  classes: PropTypes.object.isRequired,
};
const routerNavLink = withRouter(NavLink);

export default withStyles(styles)(routerNavLink);
