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
    borderRadius: '0px',
    padding: 0,
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'grey',
    minWidth: 63,
    fontFamily: 'Pompiere, cursive',
    transition: 'transform .3s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgb(242, 242, 242, 0)',
      transform: 'scale(1.4)',
    },
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
