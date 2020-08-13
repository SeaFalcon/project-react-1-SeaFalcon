import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import AlbumOfTheYear from './AlbumOfTheYear';
import Search from './Search';
import GlobalStyles from './GlobalStyles';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={AlbumOfTheYear} />
          <Route path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
      <GlobalStyles />
    </div>
  );
}
