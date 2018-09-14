import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import imageSource from '../gallery/imageSource';

const styles = theme => ({
  layout: {
   
  },
  mainFeaturedPost: {
    width: '100%',
    height: '500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'white',
    boxShadow: 'none',
    borderRadius: '0px'
  },
  mainFeaturedPostContent: {
  }
});

class MainTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ''
    };
  }

  componentDidMount() {
    imageSource().then((images) => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      this.setState({
        imageUrl: `url(${randomImage.url})`
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.layout}>
          <Paper className={classes.mainFeaturedPost} style={{backgroundImage: this.state.imageUrl}}>
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography variant="display1" color="inherit" gutterBottom>
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
  )}
}

MainTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainTitle);
