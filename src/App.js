import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import { Page1, Page2 } from './containers'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={'/'} component={Page1} />
          <Route path={'/map'} component={Page2} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
