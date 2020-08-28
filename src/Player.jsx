import React from 'react';

import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import { get } from './utils';

const Player = styled.iframe({
  height: '80vh',
});

export default () => {
  const albumId = useSelector(get('albumId'));

  return (
    <Player
      src={albumId}
      width="300"
      height="80"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
      title="web-player"
    />
  );
};
