import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import imageSource from '../gallery/imageSource';

const randomImage = imageSource()[Math.floor(Math.random() * imageSource().length)];

const styles = {
  layout: {
   
  },
  mainFeaturedPost: {
    //backgroundImage: `url(${randomImage.url})`,
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'white',
    boxShadow: 'none'
  },
  mainFeaturedPostContent: {
    padding: '5%'
  }
};

function MainTitle(props) {
  const { classes } = props;
  return (
        <div className={classes.layout}>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography variant="display2" color="inherit" gutterBottom>
                    Title of a longer featured blog post
                  </Typography>
                  <Typography variant="headline" color="inherit" paragraph>
                    Multiple lines of text that form the lede, informing new readers quickly and
                    efficiently about what&apos;s most interesting in this post&apos;s contents.
                  </Typography>
                  <Typography variant="title" color="inherit">
                    Continue reading...
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
)}

MainTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainTitle);