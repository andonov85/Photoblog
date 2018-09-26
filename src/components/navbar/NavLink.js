import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './NavLink.css';

const styles = theme => ({
  buttons: {
    '&:hover': {
      borderBottom: '2px solid black',
      // backgroundColor: 'transparent'
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
        <div className={classes.galleryContainer}>
          <Button className={classes.buttons + ' ' + 'gallery'}>{buttonName}</Button>
          <div className="subMenu">
            <div className="line"/>
            <div className="subMenuButton">{'Flowers'}</div>
            <div className="subMenuButton">{'Landscapes and seascapes'}</div>
            <div className="subMenuButton">{'Macro'}</div>
            <div className="subMenuButton">{'Black and white'}</div>
            <div className="subMenuButton">{'Other'}</div>
          </div>
        </div>
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
