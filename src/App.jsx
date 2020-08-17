import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Search from './Search';
import GlobalStyles from './GlobalStyles';
import AlbumOfTheYearPage from './AlbumOfTheYearPage';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={AlbumOfTheYearPage} />
          <Route path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
      <GlobalStyles />
    </div>
  );
}
