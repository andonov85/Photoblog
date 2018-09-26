import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './NavLink.css';
import uuidv1 from 'uuid/v1';

const categories = ['Flowers', 'Landscapes and seascapes', 'Macro', 'Black and white', 'Other'];
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
    <Route path={to} children={({ match }) => 
      buttonName === 'Gallery'
      ? 
        (<div className={classes.galleryContainer}>
          <Link type="button" replace={match === location.pathname} to={to} style={{textDecoration: "none"}}>
            <Button className={classes.buttons + ' ' + 'gallery'}>{buttonName}</Button>
          </Link>
          <div className="subMenu">
            <div className="line"/>
              {categories.map((category) =>
                (<Link to={`/category/${category.toLowerCase()}`} key={uuidv1()} style={{textDecoration: "none"}}>
                  <div className="subMenuButton">{category}</div>
                </Link>)
              )}
          </div>
        </div>)
      :
      (<Link type="button" replace={match === location.pathname} to={to} style={{textDecoration: "none"}}>
        <Button className={classes.buttons}>{buttonName}</Button>
      </Link>)
    }/>
  )
}

NavLink.propTypes = {
  classes: PropTypes.object.isRequired,
};
const routerNavLink = withRouter(NavLink);

export default withStyles(styles)(routerNavLink);
