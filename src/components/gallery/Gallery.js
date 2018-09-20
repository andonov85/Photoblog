import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

import firebase from '../../Firebase';

const styles = theme => ({
  card: {
    margin: 'auto', // center the elements
    '&:hover': {
      opacity: 0.8
    },
    maxWidth: 345,
    boxShadow: 'none',
    borderRadius: 0
  },
  media: {
    height: 210,
  },
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesData: []
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('images').doc('categories').get().then((doc) => {
      this.setState({
        categoriesData: doc.data().categories
      });
    });
  }

  handleOnClick() {

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
        {this.state.categoriesData.map((data) => {
          return (
            <Grid item xs={12} sm={6} key={data.categories}>
              <Card className={classes.card} onClick={this.handleOnClick}>
                  <CardMedia
                    className={classes.media}
                    image={data.thumbUrl}
                    title={data.category}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2" align='center'>
                      {data.category}
                    </Typography>
                  </CardContent>
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
