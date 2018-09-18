import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Posts from './Posts'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  posts: {
    marginLeft: '50%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0%',
    }
  }
});


class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item sm={6} xs={12}>
            <div className={classes.posts}>
              <Posts />
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>

          </Grid>
        </Grid>
      </div>
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);
