import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import imageSource from './imageSource';
import './galleryStyles.css'

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
  blurredON: {
    webkitFilter: 'blur(4px)', /* Chrome, Safari, Opera */
    filter: 'blur(4px)'
  },
  blurredOFF: {
    webkitFilter: '', /* Chrome, Safari, Opera */
    filter: ''
  }
});

const tileData = imageSource();

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blurred: 'blurredOFF'
    };
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnMouseEnter(e) {
    // e.currentTarget.classList.remove(this.props.classes.blurredOFF);
    // e.currentTarget.classList.add(this.props.classes.blurredON);
    // this.setState({
    //   blurred: 'blurredON'
    // });
  }

  handleOnMouseLeave(e) {
    // e.currentTarget.classList.remove(this.props.classes.blurredON);
    // e.currentTarget.classList.add(this.props.classes.blurredOFF);
    // this.setState({
    //   blurred: 'blurredOFF'
    // });
  }

  handleOnClick() {

  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <GridList cellHeight={160} className={this.props.classes.gridList} cols={4}>
          {tileData.map(tile => (
            <GridListTile key={tile.id} cols={tile.cols || 1}>
              <img src={tile.thumbFileUrl} alt={tile.name}
                onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} onClick={this.handleOnClick} 
                />
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