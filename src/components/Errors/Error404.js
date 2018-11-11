import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
  root: {
    marginTop: 150
  },
});

class Error404 extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <Typography paragraph={true} variant="h1" align="center" color="primary">
            <Zoom in={true} timeout={500}>
              <i className="material-icons" style={{ fontSize: '150px' }}>
                error_outline
              </i>
            </Zoom>
            Error404:
          </Typography>
          <Typography paragraph={true} variant="h2" align="center" color="primary">
            Page not found
        </Typography>
      </div>
    );
  }
}

Error404.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Error404);
