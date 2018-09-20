import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Typography } from '@material-ui/core';

import imageSource from './imageSource';

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
    flexGrow: 1
  },
  rootGridList: {
    marginLeft: '25%',
    marginRight: '25%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0%',
      marginRight: '0%',
    }
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5'
  },
  subheader: {
    width: '100%'
  }
});

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: '',
      tileData: []
    };
    this.handleOnClick = this.handleOnClick.bind(this);
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
      url: e.currentTarget.dataset.url,
      name: e.currentTarget.getAttribute('name'),
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>
      </div>
    );
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
