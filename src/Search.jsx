import React from 'react';

import styled from '@emotion/styled';

import { useSelector, useDispatch } from 'react-redux';

import { get } from './utils';

import { setSearchQuery, setSearchResult, setAlbumId } from './actions';

const SearchBar = styled.input({
  all: 'unset',
  fontSize: '2.25em',
  width: '100%',
  marginTop: '20px',
  marginLeft: '20px',
  display: 'block',
  backgroundColor: 'rgba(20, 20, 20, 1)',
});

const Grid = styled.div({
  // padding: '20px',
  // marginTop: '30px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 200px)',
  gridGap: '25px',
  overflow: 'auto',
  height: '75vh',
  width: 'calc(100vw - 300px)',
  // width: '100%',
  justifyContent: 'space-evenly',
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

export default function Search() {
  const dispatch = useDispatch();

  const searchQuery = useSelector(get('searchQuery'));
  const searchResult = useSelector(get('searchResult'));
  const userInformation = useSelector(get('userInformation'));

  async function handleSubmit(e) {
    e.preventDefault();

    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=album&limit=50`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.accessToken}`,
      },
      json: true,
    });

    const result = await response.json();
    console.log(result);
    const { albums: { items } } = result;

    dispatch(setSearchResult(items));
    dispatch(setSearchQuery(''));
  }

  function handleChange(e) {
    const { target: { value } } = e;
    dispatch(setSearchQuery(value));
  }

  function handleClick(albumId) {
    dispatch(setAlbumId(albumId));
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="search-music" hidden>Search</label>
        <SearchBar
          type="text"
          id="search-music"
          placeholder="Search Artist or Album"
          onChange={handleChange}
          value={searchQuery}
        />
      </form> */}
      <Grid id="grid" onScroll={() => ({})}>
        {searchResult
          ? searchResult.map((album) => (
            <Container
              key={album.id}
              onClick={() => handleClick(album.id)}
            >
              <ImageContainer>
                <Image imageUrl={album.images[1].url} />
                <Rating>
                  <p>
                    Type:
                    {' '}
                    {album.album_type}
                  </p>
                  <p>
                    Release Date:
                    {' '}
                    {album.release_date}
                  </p>
                  <p>
                    Tracks:
                    {' '}
                    {album.total_tracks}
                  </p>
                </Rating>
              </ImageContainer>
              <Artist>{album.artists[0].name}</Artist>
              <Album>{album.name}</Album>
            </Container>
          ))
          : ''}
      </Grid>
    </div>
  );
}

//  or Music Track
