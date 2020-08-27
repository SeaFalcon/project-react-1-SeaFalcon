import React from 'react';

import styled from '@emotion/styled';

const Player = styled.iframe({
  height: '80vh',
});

export default function Side() {
  return (
    <Player
      src={`https://open.spotify.com/embed/album/${'5xOUBZEXwpTiuH4LEror9h'}`}
      width="300"
      height="80"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
      title="web-player"
    />
  );
}
