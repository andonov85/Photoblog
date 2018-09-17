import React, { Component } from 'react';
import { Route, HashRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NavBar from './components/navbar/NavBar';
import Grid from '@material-ui/core/Grid';

import Main from './components/main/Main';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
import Blog from './components/blog/Blog';
// import Footer from './components/footer/Footer'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class App extends Component {
  render() {
    const {classes} = this.props;

    return (
      <HashRouter>
          <Grid container spacing={0} className={classes.root}>
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Grid item xs={12}>
                <Route exact path="/" component={Main}/>
                <Route path="/main" component={Main}/>
                <Route path="/about" component={About}/>
                <Route path="/gallery" component={Gallery}/>
                <Route path="/blog" component={Blog}/>
            </Grid>
            <Grid item xs={12}>
              {/* ToDo <Route path="/footer" component={Footer}/> */}
            </Grid>
          </Grid>
      </HashRouter>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
