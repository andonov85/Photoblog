import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  buttons: {
    [theme.breakpoints.down('sm')]: {
      color: 'white',
    },
    fontSize: 13,
    fontFamily: 'Pompiere, cursive',
    borderRadius: 0
  }
});

class NavLink extends React.Component {
  render() {
    const { classes, to, location, buttonName } = this.props;
    return (
      <Route path={to} children={({ match }) => 
        <Link type="button" replace={match === location.pathname} to={to} style={{textDecoration: "none"}}>
          <Button className={classes.buttons}>{buttonName}</Button>
        </Link>
      }/>
    )
  }
}

NavLink.propTypes = {
  classes: PropTypes.object.isRequired,
};
const routerNavLink = withRouter(NavLink);

export default withStyles(styles)(routerNavLink);
