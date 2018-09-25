import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  buttons: {
    '&:hover': {
      borderBottom: '2px solid black',
      backgroundColor: 'transparent'
    },
    fontSize: 13,
    borderRadius: 0
  }
});

const NavLink = ({ classes, to, location, buttonName }) => {
  return (
    <Route path={to} children={({ match }) => (
      <Link type="button" replace={match === location.pathname} to={to} style={{textDecoration: "none"}}>
        {buttonName === 'Gallery' ? 
        <Button className={classes.buttons}>{buttonName}</Button>
      :
        <Button className={classes.buttons}>{buttonName}</Button>
      }
      </Link>
    )}/>
  )
}

NavLink.propTypes = {
  classes: PropTypes.object.isRequired,
};
const routerNavLink = withRouter(NavLink);

export default withStyles(styles)(routerNavLink);
