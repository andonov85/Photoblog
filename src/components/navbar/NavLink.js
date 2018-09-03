import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const NavLink = ({ to, location, buttonName }) => (
  <Route path={to} children={({ match }) => (
      <Link type="button" replace={to === location.pathname} to={to} style={{textDecoration: "none"}}>
        <Button>{buttonName}</Button>
      </Link>
  )}/>
)

export default withRouter(NavLink);