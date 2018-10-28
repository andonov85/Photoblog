import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';

import LazyLoad from 'react-lazy-load';

import Post from './Post';
import AdminTools from './AdminTools';
import asearch from '../../Algolia';
import { UserContext } from '../../App';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  posts: {
    marginLeft: '40%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0%',
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  articlesTitle: {
    color: 'grey'
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
  }
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

  componentDidMount() {
    asearch('').then((content) => {
      this.setState({
        posts: content.hits,
      });
    });
  }

  handleOnSearchChange(event) {
    const searchValue = event.target.value;
    asearch(searchValue).then((content) => {
      this.setState({
        posts: content.hits,
      });
    });
  }

  handleOnContentVisible() {

  }

  render() {
    const { classes } = this.props;
    const { posts } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.grid}>
          <Grid item sm={12} md={2}>
          </Grid>
          <Grid item sm={12} md={8}>
            <Typography variant="title" gutterBottom={true} align="left" className={classes.articlesTitle}>
              LATEST ARTICLES
              <Divider />
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className={classes.grid}>
          <Grid item sm={12} md={7}>
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
          <Grid item sm={12} md={5}>
            <Grid container spacing={0} className={classes.grid}>
              <Grid item sm={3} md={3}>
                <TextField
                  className={classes.textField}
                  onChange={this.handleOnSearchChange}
                  id="outlined-search"
                  label="Search post..."
                  type="search"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={3} md={3}>
                <UserContext.Consumer>
                  {user => user && user.role === 'admin' ? <AdminTools /> : null}
                </UserContext.Consumer>
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
