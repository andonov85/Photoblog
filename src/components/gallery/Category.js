import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../Firebase';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import makeCancelablePromise from '../helperFunctions/makeCancelablePromise';

function getModalStyle() {
  const top = 0;
  const left = 0;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  root: {
    paddingTop: 30,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    }
  },
  gridItem: {
    padding: '45px 0px 45px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: 8,
    }
  },
  category: {
    marginTop: 20,
    fontFamily: 'Great Vibes, cursive',
    fontSize: 56,
    textTransform: 'capitalize'
  },
  card: {
    margin: 'auto',
    '&:hover': {
      opacity: 0.8,
    },
    maxWidth: 400,
    borderRadius: 0,
  },
  cardContent: {
    backgroundColor: '#f5f5f5'
  },
  media: {
    height: 250,
  },
  paper: {
    boxSizing: 'border-box',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'black',
  },
  imageContainer: {
    position: 'relative',
    height: '86vh',
    [theme.breakpoints.down('lg')]: {
      height: '85vh',
    },
    [theme.breakpoints.down('md')]: {
      height: '70vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
    },
    [theme.breakpoints.down('xs')]: {
      height: '45vh',
    },
  },
  image: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    maxWidth: '100%',
    maxHeight: '100%'
  },
  caption: {
    backgroundColor: 'black',
    margin: '4vw 0vw 1vw 1vw',
  },
  exitButton: {
    float: 'right'
  }
});

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.touchStart = 0;

    this.state = {
      images: [],
      index: 0,
      openModal: false,
      clientX: 0,
      showImage: true
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnTouchStart = this.handleOnTouchStart.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }
  
  handleOnLoad () {
    this.setState({
      clientX: 0,
      showImage: true
    });
  }

  handleOnTouchStart(e) {
    this.touchStart = e.targetTouches['0'].clientX;
  }

  handleOnTouchMove(e) {
    const pixels = e.targetTouches['0'].clientX - this.touchStart;
    this.setState({
      clientX: pixels
    });
  }

  handleOnTouchEnd(e) {
    const touchEnd = e.changedTouches['0'].clientX;

    if (touchEnd > this.touchStart + 20) {
      this.handleLeft();
    } else if (touchEnd < this.touchStart - 20) {
      this.handleRight();
    }
  }


  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.handleLeft();
    } else if (e.key === 'ArrowRight') {
      this.handleRight();
    }
  }

  handleLeft() {
    if (this.state.index - 1 < 0) return;
    this.setState({ 
      index: this.state.index - 1,
      showImage: false
    });
  };

  handleRight() {
    if (this.state.index + 1 > this.state.images.length - 1) return;
    this.setState({
      index: this.state.index + 1,
      showImage: false
    });
  };

  handleOpen(e) {
    const index = Number(e.target.dataset.index);
    this.setState({
      openModal: true,
      index: index,
    });
  }

  handleClose = () => {
    this.setState({ openModal: false });
  };

  fetchImages = makeCancelablePromise(new Promise((resolve, reject) => {
    const { category } = this.props.match.params;
    const db = firebase.firestore();

    db.collection('images').where('category', '==', category).get().then((snapshot) => {
      if (snapshot.empty) reject('There are no documents in the query snapshot');
      let imagesData = [];

      snapshot.forEach((doc) => {
        const { id, name, url, thumbUrl, category, description } = doc.data();
        imagesData.push({ id, name, url, thumbUrl, category, description });
      });

      resolve(imagesData);
    });
  }));

  componentDidMount() {
    this.fetchImages
      .promise
      .then((imagesData) => {
        this.setState({
          images: imagesData
        });
      })
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasOwnProperty('match') && prevProps.match.params.category !== this.props.match.params.category) {
      this.setImageSource();
    }
  }

  componentWillUnmount() {
    this.fetchImages.cancel();
  }

  render() {
    const { images, index, openModal, clientX, showImage } = this.state;
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.category} gutterBottom variant="h4" align="center">
          {match.params.category}
        </Typography>
        <Grid container spacing={0} justify="center">
          {images.map((data, index) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={data.id} className={classes.gridItem}>
                <Card className={classes.card} about={data.category.toLowerCase()}>
                  <CardMedia
                    className={classes.media}
                    image={data.thumbUrl}
                    data-index={index}
                    title={data.name}
                    onClick={this.handleOpen}
                  />
                </Card>
              </Grid>
            )
          })}
        </Grid>
        {images.length !== 0 ? <Modal
          aria-labelledby={match.params.category}
          aria-describedby='images'
          open={openModal}
          onKeyDown={this.handleKeyDown}
        >
          <div className={classes.paper} style={getModalStyle()}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={2}>
                <Hidden only={['sm']}>
                  <Paper className={classes.caption}>
                    <Typography variant="h5" color="primary" paragraph={true}>Kitty abyssinian mouser</Typography>
                    <Typography variant="body1" color="primary">Cat ipsum dolor sit amet, scottish fold. Kitty turkish angora so balinese . American shorthair savannah so tom or siberian yet birman yet persian ocelot. Burmese puma devonshire rex. Puma ocicat and american bobtail kitty yet lynx. Himalayan. Ocelot munchkin abyssinian . Bobcat ocelot. Lynx kitty malkin. Kitten puma havana brown.</Typography>
                  </Paper>
                </Hidden>
              </Grid>
              <Grid item xs={12} md={10}>
                <Grid container spacing={0} alignItems="center">
                  <Grid item xs={12}>
                    <Hidden only={['sm']}>
                      <Button className={classes.exitButton} color="primary" onClick={this.handleClose}>
                        <Typography variant="button" color="primary" style={{ fontSize: 24 }}>x</Typography>
                      </Button>
                    </Hidden>
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Hidden only={['xs', 'sm']}>
                      <div style={{ float: "right" }}>
                        <Button color="primary" onClick={this.handleLeft}>
                          <i className="material-icons" style={{ color: 'grey', fontSize: 48, float: 'right' }}>
                            chevron_left
                        </i>
                        </Button>
                      </div>
                    </Hidden>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <div className={classes.imageContainer}>
                      <img
                        className={classes.image}
                        src={images[index].url}
                        alt={images[index].name}
                        onTouchStart={this.handleOnTouchStart}
                        onTouchEnd={this.handleOnTouchEnd}
                        onTouchMove={this.handleOnTouchMove}
                        onLoad={this.handleOnLoad}
                        style={showImage ? {
                          left: clientX,
                          display: 'inline-block'
                        } : {
                          left: clientX,
                          display: 'none'
                        }} />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Hidden only={['xs', 'sm']}>
                      <Button color="primary" onClick={this.handleRight}>
                        <i className="material-icons" style={{ color: 'grey', fontSize: 48 }}>
                          chevron_right
                        </i>
                      </Button>
                    </Hidden>
                  </Grid>
                  <Grid item xs={12}>
                    <Hidden only={['sm']}>
                      <Typography align="center" color="primary" style={{ fontSize: 16 }}>
                        {`${index + 1} / ${images.length}`}
                      </Typography>
                    </Hidden>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Modal> : null}
      </div>
    )
  }
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
