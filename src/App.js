import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import TopNavBar from './components/navbar/TopNavBar';
import NavBar from './components/navbar/NavBar';

import Main from './components/main/Main';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import Category from './components/gallery/Category';
import Blog from './components/blog/Blog';
// import Footer from './components/footer/Footer'

import { setUser } from './components/blog/uploadSource';

export const UserContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex',
      width: 30,
      height: 30,
    },
  },
  GoogleLogin: {
    position: 'absolute',
    marginLeft: '81%',
    border: 'white',
    backgroundColor: 'white',
    color: 'grey',
    height: 32,
    width: 60,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
    '&:hover': {
      border: '1px #dbdbdb solid'
    },
  },
  GoogleLogout: {
    position: 'absolute',
    marginLeft: '81%',
    fontSize: 16,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    }
    this.responseGoogle = this.responseGoogle.bind(this);
    this.logout = this.logout.bind(this);
  }

  responseGoogle = (res) => {
    setUser(res.profileObj).then((user) => {
      this.setState({
        user: user
      });
    });
  }

  logout = () => {
    this.setState({
      user: undefined
    });
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <UserContext.Provider value={user}>
            <Grid container spacing={0} className={classes.root}>
              <Grid item xs={10} sm={12}>
                <TopNavBar>
                  {user ?
                    <GoogleLogout
                      className={classes.GoogleLogout}
                      tag={'div'}
                      buttonText=""
                      onLogoutSuccess={this.logout}
                    >
                      <Avatar className={classes.avatar} alt={user.userName} src={user.imageUrl} />
                    </GoogleLogout> :
                    <GoogleLogin
                      className={classes.GoogleLogin}
                      clientId={process.env.REACT_APP_GOOGLE_clientId}
                      tag={'button'}
                      uxMode={'popup'}
                      buttonText="Google login"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      isSignedIn={true}
                    >
                    </GoogleLogin>
                  }
                </TopNavBar>
              </Grid>
              <Grid item xs={1} sm={12}>
                <NavBar />
              </Grid>
              <Grid item xs={12}>
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/main" component={Main} />
                  <Route path="/about" component={About} />
                  <Route path="/gallery/" component={Gallery} />
                  <Route path="/category/:category" component={Category} />
                  <Route path="/blog" component={Blog} />
                  <Route render={() => <div>Not Found</div>} />
                </Switch>
              </Grid>
              <Grid item xs={12}>
                {/* ToDo <Route path="/footer" component={Footer}/> */}
              </Grid>
            </Grid>
          </UserContext.Provider>
        </Router>
      </MuiThemeProvider >
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
