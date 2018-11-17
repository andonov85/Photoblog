import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
    maxHeight: '100%',
    transition: 'opacity .4s ease-in-out',
  },
  caption: {
    backgroundColor: 'black',
    margin: '4vw 0vw 1vw 1vw',
  },
  exitButton: {
    float: 'right'
  }
});

class ModalImages extends React.Component {
  constructor(props) {
    super(props);
    this.touchStart = 0;
    this.touchMoveDistance = 50;

    this.state = {
      clientX: 0,
      showImage: false,
      offset: 0
    };

    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnTouchStart = this.handleOnTouchStart.bind(this);
    this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleOnLoad() {
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
    const { index, images } = this.props;
    const { offset } = this.state;
    const touchEnd = e.changedTouches['0'].clientX;

    const distance = Math.abs(this.touchStart - touchEnd);
    if (index + offset === 0 || index + offset === images.length - 1 || distance < this.touchMoveDistance) {
      this.setState({
        clientX: 0
      });
    }

    if (touchEnd > this.touchStart + this.touchMoveDistance) {
      this.handleLeft();
    } else if (touchEnd < this.touchStart - this.touchMoveDistance) {
      this.handleRight();
    }
  }


  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      this.handleLeft();
    } else if (e.key === 'ArrowRight') {
      this.handleRight();
    } else if (e.key === 'Escape') {
      this.props.handleClose();
    }
  }

  handleLeft() {
    const { index } = this.props;
    const { offset } = this.state;

    if (index + offset === 0) return;
    this.setState({
      offset: offset - 1,
      showImage: false
    });
  };

  handleRight() {
    const { index, images } = this.props;
    const { offset } = this.state;

    if (index + offset === images.length - 1) return;
    this.setState({
      offset: offset + 1,
      showImage: false
    });
  };

  render() {
    const { clientX, showImage, offset } = this.state;
    const { classes, openModal, match, images, index, handleClose } = this.props;

    return (
      <Modal
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
                    <Button className={classes.exitButton} color="primary" onClick={handleClose}>
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
                      src={images[index + offset].url}
                      alt={images[index + offset].name}
                      onTouchStart={this.handleOnTouchStart}
                      onTouchEnd={this.handleOnTouchEnd}
                      onTouchMove={this.handleOnTouchMove}
                      onLoad={this.handleOnLoad}
                      style={showImage ? {
                        left: clientX,
                        opacity: 1
                      } : {
                        left: clientX,
                        opacity: 0
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
                      {`${index + offset + 1} / ${images.length}`}
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>
    )
  }
}

ModalImages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalImages);
