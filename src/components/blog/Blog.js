import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../Firebase';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Post from './Post';
import { getPosts, sortByDate } from './blogSource';
import { setUser } from './uploadSource';

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
  GoogleLogin: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  GoogleLogout: {
    fontSize: 10,
    fontWeight: 'bold'
  },
});

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      user: {}
    };
    this.handleOnSearchChange = this.handleOnSearchChange.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    getPosts().then((posts) => {
      return posts;
    }).then((posts) => {
      const db = firebase.firestore();
      db.collection('comments')
        .orderBy('date', 'asc')
        .onSnapshot((snapshot) => {
          let comments = [];

          snapshot.forEach((comment) => {
            const { content, postId, userId, date, userName, imageUrl, subcomments } = comment.data();
            comments.push({
              commentId: comment.id,
              content: content,
              date: date.toDate().toDateString() + '  ' + date.toDate().toLocaleTimeString(),
              postId: postId,
              userId: userId,
              userName: userName,
              imageUrl: imageUrl,
              subcomments: sortByDate(subcomments)
            });
          });

          this.setState({
            posts: posts,
            comments: comments,
          });
        });
    });
  }

  handleOnSearchChange(event) {
    getPosts(event.target.value).then((posts) => {
      this.setState({
        posts: posts
      });
    });
  }

  responseGoogle = (res) => {
    setUser(res.profileObj).then((newUser) => {
      this.setState({
        user: newUser
      });
    });
  }

  logout = () => {
    this.setState({
      user: {}
    });
  }

  render() {
    const { classes } = this.props;
    const { posts, user, comments } = this.state;

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
                  const postComments = comments.filter(comment => comment.postId === post.postId);
                  console.log(postComments);
                  return (
                    <Post key={post.postId} postId={post.postId} post={post} user={user} comments={postComments} />
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
                {Object.values(user).length === 0 ?
                  <div>
                    <AccountCircle color="primary" />
                    <GoogleLogin
                      className={classes.GoogleLogin}
                      clientId={process.env.REACT_APP_GOOGLE_clientId}
                      buttonText="G Login"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      isSignedIn={true}
                    >
                    </GoogleLogin>
                  </div> :
                  <div>
                    <Avatar alt={user.userName} src={user.imageUrl} className={classes.avatar} />
                    <GoogleLogout
                      className={classes.GoogleLogout}
                      buttonText="Logout"
                      onLogoutSuccess={this.logout}
                    >
                    </GoogleLogout>
                  </div>
                }
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
