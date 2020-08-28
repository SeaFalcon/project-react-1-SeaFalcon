import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import Header from './Header';
import Search from './Search';
import GlobalStyles from './GlobalStyles';
import AlbumOfTheYearPage from './AlbumOfTheYearPage';
import ContentHeader from './ContentHeader';
import Player from './Player';

import { setUserInformation } from './actions';

const Content = styled.div({
  display: 'flex',
});

export default function App() {
  const dispatch = useDispatch();

  // console.log(localStorage.getItem('userInformation'));
  const userInformation = JSON.parse(localStorage.getItem('userInformation'));

  if (userInformation && userInformation.accessToken) {
    dispatch(setUserInformation(userInformation));
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <ContentHeader />
        <Content>
          <Player />
          <Switch>
            <Route exact path="/" component={AlbumOfTheYearPage} />
            <Route path="/search" component={Search} />
          </Switch>
        </Content>
      </BrowserRouter>
      <GlobalStyles />
    </div>
  );
}
