import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PropTypes from 'prop-types';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './components/navbar/NavBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import Avatar from '@material-ui/core/Avatar';

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
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      textAlign: 'left',
      padding: '10px 0px 10px 20px'
    },
    textAlign: 'center',
    fontFamily: 'Abril Fatface, cursive'
  },
  GoogleLogin: {
    fontSize: 16,
  },
  GoogleLogout: {
    fontSize: 16,
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex',
      width: 30,
      height: 30,
    },
    display: 'inline-flex'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
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
      user: {}
    });
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Grid container spacing={0} className={classes.root}>
            <Grid item xs={6} md={11}>
              <Typography variant="display1" className={classes.logo}>
                AA Photography
              </Typography>
            </Grid>
            <Grid item xs={1} md={1}>
              {Object.values(user).length === 0 ?
                <GoogleLogin
                  className={classes.GoogleLogin}
                  clientId={process.env.REACT_APP_GOOGLE_clientId}
                  uxMode={'popup'}
                  buttonText="Sign in"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  isSignedIn={true}
                >
                </GoogleLogin> :
                <GoogleLogout
                  className={classes.GoogleLogout}
                  tag={'div'}
                  buttonText=""
                  onLogoutSuccess={this.logout}
                >
                  <Avatar className={classes.avatar} alt={user.userName} src={user.imageUrl} />
                </GoogleLogout>
              }
            </Grid>
            <Grid item xs={1} md={11}>
              <NavBar />
            </Grid>
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/main" component={Main} />
                <Route path="/about" component={About} />
                <Route path="/gallery/" component={Gallery} />
                <Route path="/category/:category" component={Category} />
                <UserContext.Provider value={user}>
                  <Route path="/blog" component={Blog} />
                </UserContext.Provider>
                <Route render={() => <div>Not Found</div>} />
              </Switch>
            </Grid>
            <Grid item xs={12}>
              {/* ToDo <Route path="/footer" component={Footer}/> */}
            </Grid>
          </Grid>
        </Router>
      </MuiThemeProvider >
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
