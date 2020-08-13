import React from 'react';

import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import albums from '../fixtures/albums';

const Grid = styled.div({
  padding: '20px',
  marginTop: '25px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 200px)',
  gridGap: '25px',
});

const Container = styled.div({
  textAlign: 'right',
});

const Image = styled.div((props) => ({
  height: '200px',
  backgroundImage: `url(${props.imageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: '4px',
  transition: 'opacity 0.3s linear',
}));

const Rating = styled.span({
  bottom: '5px',
  right: '5px',
  position: 'absolute',
  opacity: '0',
  transition: 'opacity 0.3s linear',
  '& p': {
    marginBottom: '5px',
  },
});

const ImageContainer = styled.div({
  position: 'relative',
  '&:hover': {
    '& div': {
      opacity: '0.6',
    },
    '& span': {
      opacity: '1',
    },
  },
});

const Artist = styled.span({
  display: 'block',
  margin: '3px 0px',
  paddingRight: '5px',
  fontWeight: 600,
});

const Album = styled.span({
  color: 'rgba(255, 255, 255, 0.5)',
  paddingRight: '5px',
  display: 'block',
});

export default function AlbumOfTheYear() {
  return (
    <Grid>
      {albums.map((album) => (
        <Container key={album.id}>
          <a href={album.metalkingdomUrl} target="_blank" rel="noreferrer">
            <ImageContainer>
              <Image imageUrl={album.fullImage} />
              <Rating>
                <p>
                  Rank:
                  {' '}
                  {album.rank}
                </p>
                <p>
                  {album.releaseDate}
                </p>
                <span role="img" aria-label="rating">
                  ⭐️
                </span>
                {' '}
                {album.rating}
                /100
              </Rating>
            </ImageContainer>
            <Artist>{album.artist}</Artist>
            <Album>{album.album}</Album>
          </a>
        </Container>
      ))}
    </Grid>
  );
}
