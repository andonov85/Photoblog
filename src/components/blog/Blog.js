import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import LazyLoad from 'react-lazy-load';

import Post from './Post';
import Algolia from '../../Algolia';
import { UserContext } from '../../App';
import makeCancelablePromise from '../helperFunctions/makeCancelablePromise';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    }
  },
  titleContainer: {
    alignItems: 'center',
  },
  textField: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing.unit * 4,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit,
    },
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  articlesTitle: {
    [theme.breakpoints.down('sm')]: {
      padding: '25px 0px 0px 20px',
      fontSize: 16
    },
    color: 'grey',
  },
  articleContainer: {
    marginLeft: '25%',
    [theme.breakpoints.down('md')]: {
      marginLeft: '13%',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '7%',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0%',
    },
  },
  posts: {
    marginLeft: '30%',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '25%',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '15%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '5%',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0%',
    }
  },
  avatar: {
    margin: 10
  },
  lazyLoad: {
    display: 'inline-block',
    position: 'relative',
    height: 600,
    [theme.breakpoints.down('sm')]: {
      height: 300,
    }
  },
});

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.handleOnSearchChange = this.handleOnSearchChange.bind(this);
    this.handleOnContentVisible = this.handleOnContentVisible.bind(this);
  }

  handleOnContentVisible() {

  }

  AlgoliaResults = makeCancelablePromise(Algolia(''));

  handleOnSearchChange(event) {
    const searchValue = event.target.value;
    this.AlgoliaResults = makeCancelablePromise(Algolia(searchValue));

    this.AlgoliaResults
      .promise
      .then((content) => {
        this.setState({
          posts: content.hits,
        });
      });
  }

  componentDidMount() {
    this.AlgoliaResults
      .promise
      .then((content) => {
        this.setState({
          posts: content.hits,
        });
      });
  }

  componentWillUnmount() {
    this.AlgoliaResults.cancel();
  }

  render() {
    const { classes } = this.props;
    const { posts } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.titleContainer}>
          <Grid item xs={12} md={2} className={classes.articleContainer}>
            <Typography variant="h6" gutterBottom={false} align="left" className={classes.articlesTitle}>
              LATEST ARTICLES
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className={classes.grid}>
          <Grid item sm={12} md={8}>
            <div className={classes.posts}>
              <Grid container spacing={0}>
                {posts.map((post) => {
                  return (
                    <Grid item xs={12} key={post.objectID}>
                      <LazyLoad className={classes.lazyLoad} offsetVertical={1000} onContentVisible={this.handleOnContentVisible}>
                        <UserContext.Consumer>
                          {user => <Post postId={post.objectID} post={post} user={user} />}
                        </UserContext.Consumer>
                      </LazyLoad>
                    </Grid>
                  )
                })}
              </Grid>
            </div>
          </Grid>
          <Grid item sm={12} md={4}>
            <Grid container spacing={0} className={classes.grid}>
              <Grid item sm={12} md={12}>
                <TextField
                  className={classes.textField}
                  onChange={this.handleOnSearchChange}
                  id="outlined-search"
                  label="Search..."
                  type="search"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);
