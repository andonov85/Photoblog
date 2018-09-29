import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Typography } from '@material-ui/core';

import firebase from '../../Firebase';

const styles = theme => ({
  root: {
    paddingTop: 30,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'LavenderBlush'
  },
  links: {
    '&:hover': {
      color: 'black',
    },
    fontFamily: 'Fredericka the Great, cursive'
  }
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesData: [],
      checked: false
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('images').doc('categories').get().then((doc) => {
      this.setState({
        categoriesData: doc.data().categories,
        checked: true
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
        {this.state.categoriesData.map((data, index) => {
          return (
          <Grow 
            key={data.category.toLowerCase()}
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: (index + 1)*1000 } : {})}
          >
            <Link to={`/category/${data.category.toLowerCase()}`} style={{textDecoration: "none"}}>
              <Typography className={classes.links} gutterBottom variant="display1" align="center">
                {data.category}
              </Typography>
            </Link>
          </Grow>
            )
          })}
        </Paper>
      </div>
    )
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);
