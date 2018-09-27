import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './NavLink.css';

const categories = ['Flowers', 'Landscapes and seascapes', 'Macro', 'Black and white', 'Other'];
const styles = theme => ({
  buttons: {
    '&:hover': {
      borderBottom: '2px solid black',
      // backgroundColor: 'transparent'
    },
    fontSize: 13,
    borderRadius: 0
  },
  galleryContainer: {

  }
});

class NavLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubmenu: false
    };
    this.handleOnclick = this.handleOnclick.bind(this);
  }

  handleOnclick(e) {
    this.setState({
      showSubmenu: !this.state.showSubmenu
    });
  }

  componentDidUpdate() {
    console.log(this.state.showSubmenu);
  }

  render() {
  const { classes, to, location, buttonName } = this.props;
  const { showSubmenu } = this.state;
  return (
    <Route path={to} children={({ match }) => 
      buttonName === 'Gallery'
      ? 
        (<div className={classes.galleryContainer} onClick={this.handleOnclick}>
          {/* <Link type="button" replace={match === location.pathname} to={to} style={{textDecoration: "none"}}> */}
            <Button className={classes.buttons + ' ' + 'galleryBtn'}>{buttonName}</Button>
          {/* </Link> */}
          <div className="subMenu" style={{display: showSubmenu ? 'block' : 'none'}}>
            <div className="line"/>
            {categories.map((category) =>
              (<Link to={`/category/${category.toLowerCase()}`} key={category} style={{textDecoration: "none"}}>
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
  )}
}

NavLink.propTypes = {
  classes: PropTypes.object.isRequired,
};
const routerNavLink = withRouter(NavLink);

export default withStyles(styles)(routerNavLink);
