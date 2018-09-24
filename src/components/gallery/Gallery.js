import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

import firebase from '../../Firebase';

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
      padding: 0,
    }
  },
  card: {
    margin: 'auto', // center the elements
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
  }
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesData: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('images').doc('categories').get().then((doc) => {
      this.setState({
        categoriesData: doc.data().categories
      });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Paper style={{backgroundColor: '#f5f5f5'}}>
        <Typography gutterBottom variant="display1" align="center">
          Photo gallery
        </Typography>
      </Paper>
        <Grid container spacing={0} justify="center">
          {this.state.categoriesData.map((data) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={data.category} className={classes.gridItem}>
                <Card className={classes.card} onClick={this.handleOnClick}>
                  <Link to={`/category/${data.category.toLowerCase()}`} style={{textDecoration: "none"}}>
                  <CardMedia
                    className={classes.media}
                    image={data.thumbUrl}
                    title={data.category}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="title" align="center">
                      {data.category}
                    </Typography>
                  </CardContent>
                  </Link>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);
