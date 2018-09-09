import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';

import imageSource from './imageSource';
import './galleryStyles.css'

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  gridList: {
    width: 800,
    height: 500,
  },
  subheader: {
    width: '100%'
  },
  paper: {
    position: 'absolute',
    maxWidth: theme.spacing.unit * 200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
  },
  card: {
    margin: '0px auto',
    display: 'inline-block',
  },
  media: {
    maxHeight: '800px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

const tileData = imageSource();

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      url: '',
      name: ''
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
      <div className={classes.root}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={this.state.url}
                alt={this.state.name}
              />
            </Card>
          </div>
        </Modal>
        <GridList cellHeight={160} className={classes.gridList} cols={4}>
          {tileData.map(tile => (
            <GridListTile key={tile.id} cols={tile.cols || 1}>
              <img className="thumbs" src={tile.thumbFileUrl} alt={tile.url} name={tile.name} onClick={this.handleOnClick}/>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);
