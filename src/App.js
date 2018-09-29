import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NavBar from './components/navbar/NavBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Main from './components/main/Main';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import Category from './components/gallery/Category';
import Blog from './components/blog/Blog';
// import Footer from './components/footer/Footer'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      textAlign: 'left',
    },
    textAlign: 'center',
    fontFamily: 'Abril Fatface, cursive'
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
          <Grid container spacing={0} className={classes.root}>
            <Grid item xl={12} xs={8}>
              <Typography variant="display1" className={classes.logo}>
                AA Photography
              </Typography>
            </Grid>
            <Grid item xl={12} xs={4}>
              <NavBar/>
            </Grid>
            <Grid item xs={12}>
                <Switch>
                  <Route exact path="/" component={Main}/>
                  <Route path="/main" component={Main}/>
                  <Route path="/about" component={About}/>
                  <Route path="/gallery/" component={Gallery}/>
                  <Route path="/category/:category" component={Category}/>
                  <Route path="/blog" component={Blog}/>
                  <Route render={() => <div>Not Found</div>} />
                </Switch>
            </Grid>
            <Grid item xs={12}>
              {/* ToDo <Route path="/footer" component={Footer}/> */}
            </Grid>
          </Grid>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
