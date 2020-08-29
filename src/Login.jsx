import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { setUserInformation, setAccessToken } from './actions';

import {
  generateRandomString, getHashParams, requestSpotifyUserInfomation, get,
  requestSpotifyAccessToken, requestSpotifyRefreshToken, getSearchParams,
} from './utils';

const Login = styled.div({
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5em',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.5)',
    transition: 'color 0.3s ease-in-out',
  },
  position: 'absolute',
  right: '30px',
});

const Profile = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: '60px',
});

const Image = styled.img({
  borderRadius: '50%',
  width: '40px',
});

const Name = styled.span({
  margin: '0px 10px',
  marginTop: '5px',
  fontSize: '1.2em',
});

const Button = styled.button({
  margin: '0px 2px',
  marginTop: '2px',
});

export default () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const userInformation = useSelector(get('userInformation'));

  const stateKey = 'spotify_auth_state';

  console.log(window.location);

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    state: receiveState,
  } = getHashParams();

  console.log(getHashParams());

  const {
    code,
  } = getSearchParams();

  useEffect(() => {
    if (accessToken) {
      const storedState = localStorage.getItem(stateKey);

      const userInfo = requestSpotifyUserInfomation({
        accessToken,
        state: receiveState,
        storedState,
      });

      userInfo
        .then((user) => {
          const {
            display_name: name, email, id, images,
          } = user;

          dispatch(setUserInformation({
            accessToken, refreshToken, name, email, id, image: images[0].url,
          }));
        })
        .catch((e) => Error(e));

      history.push('/');
    }

    if (code) {
      requestSpotifyAccessToken({ code });
    }
  }, []);

  function handleClickLogin() {
    const clientId = '396ba6712d884275a62181d646dd0125'; // Your client id
    const scope = 'user-read-private user-read-email';
    const redirectUri = window.location.href; // 'http://localhost:8080'; // Your redirect uri
    const state = generateRandomString(16);

    localStorage.setItem(stateKey, state);

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=code';
    url += `&client_id=${encodeURIComponent(clientId)}`;
    url += `&scope=${encodeURIComponent(scope)}`;
    url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;
    url += `&state=${encodeURIComponent(state)}`;

    window.location.assign(url);
  }

  async function handleClickRequestRefreshToken() {
    const { access_token: refreshedToken } = await requestSpotifyRefreshToken({
      refreshToken: userInformation.refreshToken,
    });
    dispatch(setAccessToken(refreshedToken));
  }

  function handleClickLogout() {
    dispatch(setUserInformation({}));
  }

  if (userInformation.accessToken) {
    return (
      <Profile>
        <Image src={userInformation.image} alt="userImage" />
        <Name>{userInformation.name}</Name>
        <Button type="button" onClick={handleClickRequestRefreshToken}>Refresh</Button>
        <Button type="button" onClick={handleClickLogout}>Log out</Button>
      </Profile>
    );
  }

  return <Login onClick={handleClickLogin}>Log in with Spotify</Login>;
};
