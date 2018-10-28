import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import NavLink from './NavLink';

const styles = {
  fullList: {
    width: 'auto',
    backgroundColor: 'grey'
  },  
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class DrawerMenu extends React.Component {
  state = {
    top: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const fullList = (
      <List className={classes.fullList}>
        <NavLink to="/main" buttonName="Home" />
        <NavLink to="/blog" buttonName="Blog" />
        <NavLink to="/gallery" buttonName="Gallery" />
        <NavLink to="/about" buttonName="About" />
      </List>
    );

    return (
      <React.Fragment>
        <Button className={classes.menuButton} onClick={this.toggleDrawer('top', true)}>
          <i className="material-icons" style={{ color: 'grey' }}>menu</i>
        </Button>
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {fullList}
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerMenu);
