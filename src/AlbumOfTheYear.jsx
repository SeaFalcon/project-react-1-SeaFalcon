import React from 'react';

import styled from '@emotion/styled';

import albums from '../fixtures/albums';

const Item = styled.ul({
  marginTop: '10px',
  display: 'flex',
  marginBottom: '10px',
});

const Image = styled.img({
  width: 300,
  height: 300,
  marginRight: '10px',
});

const Album = styled.div({

});

export default function AlbumOfTheYear() {
  return (
    <ul>
      {albums.map((album) => (
        <Item key={album.id}>
          <Image alt="" src={album.fullImage} />
          <Album>
            <h2>{album.artist}</h2>
            <h3>{album.album}</h3>
            <div>
              <p>
                Rank :
                {' '}
                {album.rank}
              </p>
              <p>
                Vote :
                {' '}
                {album.vote}
              </p>
              <p>
                Reviews :
                {' '}
                {album.reviews}
              </p>
              <p>
                Release Date :
                {' '}
                {album.releaseDate}
              </p>
            </div>
            <button type="button">Go To Spotify</button>
            <a href="http://metalkingdom.net/album/h.e.a.t-h.e.a.t-ii-133088" target="_blank" rel="noreferrer">Go To MetalKingdom</a>
          </Album>
        </Item>
      ))}
    </ul>
  );
}
