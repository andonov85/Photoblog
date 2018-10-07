import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

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
      posts: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.logout = this.logout.bind(this);
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

  responseGoogle = (res) => {
    alert('А така, ' + res.profileObj.name + ', сега ми падна! ;) (майтап, само те пробвам)');
  }

  logout = () => {
    console.log('Log outed');
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
                    <Post post={post} key={post.linkUrl} />
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
                  onChange={this.handleOnChange}
                  id="outlined-search"
                  label="Search post..."
                  type="search"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={3} md={3}>
                <GoogleLogin
                  className={classes.GoogleLogin}
                  clientId={process.env.REACT_APP_GOOGLE_clientId}
                  buttonText="G Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                >
                </GoogleLogin>
                <GoogleLogout
                  className={classes.GoogleLogout}
                  buttonText="logout"
                  onLogoutSuccess={this.logout}
                >
                </GoogleLogout>
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
