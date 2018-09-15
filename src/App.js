import React, { Component } from 'react';
import { Route, HashRouter } from "react-router-dom";

import NavBar from './components/navbar/NavBar';
import Grid from '@material-ui/core/Grid';

import Main from './components/main/Main';
import About from './components/about/About';
import Gallery from './components/gallery/Gallery';
// import Blog from './components/blog/Blog';

import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="rootApp">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <NavBar />
            </Grid>
            <Grid item xs={12}>
                <Route exact path="/" component={Main}/>
                <Route path="/main" component={Main}/>
                <Route path="/about" component={About}/>
                <Route path="/gallery" component={Gallery}/>
                {/* <Route path="/blog" component={Blog}/> */}
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

export default App;
