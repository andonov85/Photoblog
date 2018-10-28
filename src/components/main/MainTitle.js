import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import imageSource from '../gallery/imageSource';

const styles = theme => ({
  paper: {
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 45px)',
    },
    width: '100%',
    height: 'calc(100vh - 85px)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: 'grey',
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
    this.handleonLoad = this.handleonLoad.bind(this);
  }

  componentDidMount() {
    imageSource().then((images) => {
      if (images) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        this.setState({
          imageUrl: `${randomImage.url}`
        });
      } else {
        console.log('Can\'t download images');
      }
    });
  }

  handleonLoad() {
    this.setState({
      checked: true
    });
  }

  componentWillUnmount() {
    
  }

  render() {
    const { classes } = this.props;
    const { imageUrl, checked } = this.state;

    return (
      <Fade
        in={checked}
        timeout={{ enter: 2500, exit: 2500 }}
      >
        <Paper className={classes.paper} style={{ backgroundImage: `url(${imageUrl})` }}>
          <img src={imageUrl} alt="Flowers" onLoad={this.handleonLoad} style={{ display: 'none' }} />
        </Paper>
      </Fade>
    )
  }
}

MainTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainTitle);
