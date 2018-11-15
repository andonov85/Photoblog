import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
});

class Error404 extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Zoom in={true} timeout={500}>
          <React.Fragment>
            <Typography paragraph={true} align="center" color="primary">
              <i className="material-icons" style={{ fontSize: '6rem' }}>
                error_outline
              </i>
            </Typography>
            <Typography paragraph={true} align="center" color="primary" style={{ fontSize: '2rem' }}>
              Error404
          </Typography>
          </React.Fragment>
        </Zoom>
        <Typography paragraph={true} align="center" color="primary" style={{ fontSize: '1rem' }}>
          Page not found !
        </Typography>
      </div>
    );
  }
}

Error404.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error404);
