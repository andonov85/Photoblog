import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import NewsCard from './NewsCard';
import makeCancelablePromise from '../helperFunctions/makeCancelablePromise';

const styles = theme => ({
  root: {
    margin: '0% 10% 0% 10%',
    [theme.breakpoints.down('md')]: {
      margin: '0%',
    },
  }
});

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsFeed_first: [],
      newsFeed_part1: [],
      newsFeed_part2: [],
      newsFeed_part3: []
    };
  }

  cancelableNews = makeCancelablePromise(this.fetchNews());

  fetchNews() {
    const url = 'https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=' + process.env.REACT_APP_NEWSAPI_apiKey;
    const req = new Request(url);

    return fetch(req).then(function (response) {
      return response.json();
    });
  }

  componentDidMount() {
    this.cancelableNews.promise
      .then((result) => {
        const { articles } = result;
        const colLength = Math.floor((articles.length - 1) / 3);

        this.setState({
          newsFeed_first: articles.slice(0, 1),
          newsFeed_part1: articles.slice(1, colLength + 1),
          newsFeed_part2: articles.slice(colLength + 1, colLength * 2 + 1),
          newsFeed_part3: articles.slice(colLength * 2 + 1)
        });
      });
  }

  componentWillUnmount() {
    this.cancelableNews.cancel();
  }

  render() {
    const { classes } = this.props;
    const { newsFeed_first, newsFeed_part1, newsFeed_part2, newsFeed_part3 } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={32} direction="row" justify="center" alignItems="flex-start">
          <Grid item xs={12} sm={8}>
            <Grid container spacing={32} justify="center" alignItems="flex-start">
              <Grid item xs={12}>
                {newsFeed_first.map((value) =><NewsCard key={value.publishedAt} article={value} height="500" />)}
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={32} direction="column" justify="center" alignItems="center">
                  {newsFeed_part1.map((value) => <Grid key={value.publishedAt} item xs={12}><NewsCard article={value} /></Grid>)}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={32} direction="column" justify="center" alignItems="center">
                  {newsFeed_part2.map((value) => <Grid key={value.publishedAt} item xs={12}><NewsCard article={value} /></Grid>)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={32} direction="column" justify="center" alignItems="center">
              {newsFeed_part3.map((value) => <Grid key={value.publishedAt} item xs={12}><NewsCard article={value} /></Grid>)}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NewsFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsFeed);
