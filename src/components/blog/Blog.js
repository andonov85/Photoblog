import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Post from './Post';
import blogSource from './blogSource';

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
    [theme.breakpoints.down('md')]: {
      marginLeft: '0%',
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    blogSource.blogSource().then((posts) => {
      this.setState({
        posts: posts
      });
    });
  }

  handleOnChange(event) {
    blogSource.searchInPosts(event.target.value).then((posts) => {
      this.setState({
        posts: posts
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { posts } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.grid}>
          <Grid item sm={12} md={7}>
            <div className={classes.posts}>
              <Grid container spacing={0}>
              {posts.map((post) => {
                return (
                  <Post post={post} key={post.linkUrl}/>
                )
              })}
              </Grid>
            </div>
          </Grid>
          <Grid item sm={12} md={5}>
            <TextField
              onChange={this.handleOnChange}
              id="outlined-search"
              label="Search post..."
              type="search"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
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
