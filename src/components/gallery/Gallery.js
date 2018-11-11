import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firebase } from '../../Firebase';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import makeCancelablePromise from '../helperFunctions/makeCancelablePromise';

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%'
  },
  paper: {
    width: 450,
    padding: '4% 0% 4% 0%',
    marginTop: '2%',
    [theme.breakpoints.down('sm')]: {
      width: '65%',
      marginTop: '5%',
      padding: '7% 0% 3% 0%',
      borderRadius: '20px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '5%',
      padding: '7% 0% 3% 0%',
      borderRadius: '20px',
    },
    backgroundColor: 'white',
    border: '1px #dbdbdb solid',
    borderRadius: '30px',
    boxShadow: 'none',
  },
  categoriesContainer: {
    flexDirection: 'column',
  },
  links: {
    marginBottom: '1.5em',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '.7em',
    },
    '&:hover': {
      color: 'black',
    },
    fontFamily: 'Fredericka the Great, cursive',
    fontSize: 26
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

  fetchImageCategories = makeCancelablePromise(new Promise((resolve, reject) => {
    const db = firebase.firestore();
    db.collection('images').doc('categories').get().then((doc) => {
      if (!doc.exists) reject('Doc doesn\'t exist');
      resolve(doc.data().categories);
    });
  }));

  componentDidMount() {
    this.fetchImageCategories
      .promise
      .then((categories) => {
        this.setState({
          categoriesData: categories,
          checked: true
        });
      })
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
  }

  componentWillUnmount() {
    this.fetchImageCategories.cancel(); // Cancel the promise
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={8} className={classes.categoriesContainer}>
            {this.state.categoriesData.map((data, index) => {
              return (
                <Grow
                  key={data.category.toLowerCase()}
                  in={checked}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(checked ? { timeout: (index + 1) * 1000 } : {})}
                >
                  <Link to={`/category/${data.category.toLowerCase()}`} style={{ textDecoration: "none" }}>
                    <Typography className={classes.links} variant="h4" align="center">
                      {data.category}
                    </Typography>
                  </Link>
                </Grow>
              )
            })}
          </Grid>
        </Paper>
      </div>
    )
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);
