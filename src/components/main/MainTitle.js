import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import imageSource from '../gallery/imageSource';
import makeCancelablePromise from '../helperFunctions/makeCancelablePromise';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
      showImage: false,
      loading: true
    };
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleOnLoad() {
    this.setState({
      showImage: true,
      loading: false
    });
  }

  fetchImages = makeCancelablePromise(imageSource());

  componentDidMount() {
    this.fetchImages
      .promise
      .then((images) => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        this.setState({
          imageUrl: randomImage.url
        });
      })
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
  }

  componentWillUnmount() {
    this.fetchImages.cancel(); // Cancel the promise
  }

  render() {
    const { classes } = this.props;
    const { imageUrl, showImage, loading } = this.state;

    return (
      <div>
        {loading ?
          <Paper className={classnames(classes.root, classes.paper)}>
            <CircularProgress />
          </Paper> : null}
        <Fade
          in={showImage}
          timeout={{ enter: 2000, exit: 0 }}
        >
          <Paper className={classes.paper} style={{ backgroundImage: `url(${imageUrl})` }}>
            <img src={imageUrl} alt="Flowers" onLoad={this.handleOnLoad} style={{ display: 'none' }} />
          </Paper>
        </Fade>
      </div>
    )
  }
}

MainTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainTitle);