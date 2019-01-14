import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { discovery } from '../../IBM_Watson_Discovery';

import NewsCard from './NewsCard';
import makeCancelablePromise from '../helperFunctions/makeCancelablePromise';
// import axios from 'axios';

const styles = theme => ({
  root: {
    margin: '0% 10% 0% 10%',
    [theme.breakpoints.down('md')]: {
      margin: 0
    },
  },
  gridItem: {
    width: '100%'
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
    }).then((json) => {
      return json;
    });
  }

  componentDidMount() {
    const queryUrl = 'https://gateway-fra.watsonplatform.net/discovery/api/v1/environments/system/collections/news-en/query?version=2018-12-03&filter=enriched_title.semantic_roles%3A%28action.normalized%3Aacquire%2Cobject.entities%3A%28type%3A%3ACompany%29%29&highlight=true&passages.count=5&query=enriched_text.concepts.text%3A%22artificial%20intelligence%22';
    const url = "https://iam.cloud.ibm.com/identity/token";

    fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      withCredentials: true,
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: `grant_type=${queryUrl}&apikey=${process.env.REACT_APP_IBM_Watson_Discovery_apiKey}`
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

    // const params = {
    //   environment_id: 'system',
    //   collection_id: 'news-en',
    //   query: 'enriched_text.concepts.text:"artificial intelligence"',
    //   headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //   }
    // };
    // discovery.query(params, (error, response) => {
    //   console.log(error);
    //   console.log(response);
    // });

    this.cancelableNews.promise
      .then((result) => {
        const { articles } = result;
        const cols = Math.floor((articles.length - 1) / 3);

        this.setState({
          newsFeed_first: articles.slice(0, 1),
          newsFeed_part1: articles.slice(1, cols + 1),
          newsFeed_part2: articles.slice(cols + 1, cols * 2 + 1),
          newsFeed_part3: articles.slice(cols * 2 + 1)
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
        <Grid container spacing={0} direction="row" justify="center" alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Grid container spacing={0} justify="center" alignItems="flex-start">
              <Grid item xs={12} className={classes.gridItem}>
                {newsFeed_first.map((value) => <NewsCard key={value.publishedAt} article={value} height="500" />)}
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                  {newsFeed_part1.map((value) => <Grid className={classes.gridItem} key={value.publishedAt} item xs={12}>
                    <NewsCard article={value} />
                  </Grid>)}
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={0} direction="column" justify="center" alignItems="center">
                  {newsFeed_part2.map((value) => <Grid className={classes.gridItem} key={value.publishedAt} item xs={12}>
                    <NewsCard article={value} />
                  </Grid>)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
              {newsFeed_part3.map((value) => <Grid className={classes.gridItem} key={value.publishedAt} item xs={12}>
                <NewsCard article={value} />
              </Grid>)}
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
