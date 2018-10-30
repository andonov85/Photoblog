import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  buttons: {
    [theme.breakpoints.down('xs')]: {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: 'white',
      border: '1px #dbdbdb solid',
      borderRadius: '10px',
      color: 'black'
    },
    padding: 0,
    fontSize: 20,
    textTransform: 'none',
    transition: 'unset',
    minWidth: 63,
    fontFamily: 'Pompiere, cursive',
    borderRadius: 0
  },
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
