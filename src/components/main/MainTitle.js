import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import imageSource from '../gallery/imageSource';

const styles = theme => ({
  paper: {
    width: '100%',
    height: 'calc(100vh - 45px)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'white',
    boxShadow: 'none',
    borderRadius: '0px'
  }
});

class MainTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      checked: false
    };
  }

  componentDidMount() {
    imageSource().then((images) => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      this.setState({
        imageUrl: `url(${randomImage.url})`,
        checked: setTimeout(() => {
          return true
        }, 2000)
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    return (
        <Fade
          in={checked}
          timeout={{enter: 2500}}
        >
          <Paper className={classes.paper} style={{backgroundImage: this.state.imageUrl}}>
            <Grid container>
              <Grid item md={6}>
                <Typography variant="display1" color="inherit" gutterBottom>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
  )}
}

MainTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainTitle);
