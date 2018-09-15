import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';

import imageSource from './imageSource';
import './galleryStyles.css'
import { Typography } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  rootGrid: {
    flexGrow: 1
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  gridList: {
    width: '50%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  subheader: {
    width: '100%'
  },
  paper: {
    position: 'absolute',
    maxWidth: theme.spacing.unit * 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    outline: 'none'
  },
  containerImage: {
    display: 'grid',
    height: '100%',
    borderRadius: '0px'
  },
  image: {
    maxHeight: '100vh',
    maxWidth: '100vw'
  }
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      url: '',
      name: '',
      tileData: [],
      gallery: 'All photos'
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    imageSource().then((images) => {
      this.setState({
        tileData: images
      });
    });
  }

  handleOnClick(e) {
    this.setState({
      openModal: true,
      url: e.currentTarget.getAttribute('alt'),
      name: e.currentTarget.getAttribute('name'),
    });
  }

  handleClose = () => {
    this.setState({openModal: false});
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Card className={classes.containerImage}>
              <img
                className={classes.image}
                src={this.state.url}
                alt={this.state.name}
              />
            </Card>
          </div>
        </Modal>
      <div className={classes.rootGrid}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography>
              {this.state.gallery}
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <div className={classes.root}>
            <GridList cellHeight={160} className={classes.gridList} cols={6}>
              {this.state.tileData.map(tile => (
              <GridListTile key={tile.id} cols={tile.cols}>
                <img className="thumbs" src={tile.thumbFileUrl} alt={tile.url} name={tile.name} onClick={this.handleOnClick}/>
              </GridListTile>
              ))}
            </GridList>
            </div>
          </Grid>
        </Grid>
      </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);
