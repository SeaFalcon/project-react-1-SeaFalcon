import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import {
  setYear, changeDropDownIsOpen, setPage, setAlbumId,
} from './actions';

import { month, removeSpecialCharacters } from './utils';

const MainContainer = styled.div({
  // height: '120vh',
  width: '100%',
});

const ContainerBody = styled.div({
  display: 'flex',
  width: '100%',
});

const Side = styled.footer({
  // position: 'fixed',
  '& iframe': {
    height: '80vh',
  },
});

const Grid = styled.div({
  // padding: '20px',
  // marginTop: '10px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 200px)',
  gridGap: '25px',
  overflow: 'auto',
  height: '80vh',
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

const DropDownContainer = styled.div({
  display: 'flex',
  overflow: 'auto',
  width: '100%',
  height: '10vh',
  alignItems: 'center',
});

const DropDownHeader = styled.div((props) => ({
  // marginBottom: '0.8em',
  padding: '0 1em',
  boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
  fontWeight: '500',
  fontSize: '1.5rem',
  color: 'white', // '#3faffa',
  // background: '#ffffff',
  display: `${props.isOpen ? 'none' : 'flex'}`,
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.5)',
    transition: 'color 0.3s ease-in-out',
  },
}));

const DropDownListContainer = styled.div({
  // height: '15vh',
  // overflow: 'auto',
});

const DropDownList = styled.ul({
  padding: '0',
  margin: '0',
  paddingLeft: '1em',
  // background: '#ffffff',
  // border: '2px solid #e5e5e5',
  boxSizing: 'border-box',
  // color: '#3498db', // '#3faffa',
  // fontSize: '1.3rem',
  // fontWeight: '500',
  '&:first-of-type': {
    paddingTop: '1.2em',
  },
  display: 'flex',
  flexDirection: 'row',
  // overflow: 'auto',
  flexWrap: 'wrap',
});

const ListItem = styled.li((props) => ({
  listStyle: 'none',
  marginBottom: '0.8em',
  paddingRight: '10px',
  color: `${props.selected ? '#3faffa' : ''}`,
  fontWeight: `${props.selected ? '700' : ''}`,
  '&:hover': {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.5)',
    transition: 'color 0.3s ease-in-out',
  },
}));

export default function AlbumOfTheYear({
  albums, year, availableYears, onScroll, isOpen, albumId, accessToken,
}) {
  const baseUrl = 'https://www.metalkingdom.net';

  const years = Object.keys(availableYears).reverse();

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(changeDropDownIsOpen());
  };

  const onOptionClicked = (value) => {
    dispatch(setYear(value));

    const { page } = availableYears[value];

    dispatch(setPage(page));

    dispatch(changeDropDownIsOpen());
  };

  const handleClick = async (event, artist, album, date) => {
    if (event) event.preventDefault();

    let url = '';

    const splittedDate = date.split(' ');

    const formattedAlbum = album.replace('[Live]', '').trim();

    let formattedDate = '';

    if (splittedDate.length < 2) {
      url = `https://api.spotify.com/v1/search?q=${artist} ${removeSpecialCharacters(formattedAlbum)} year:${splittedDate[0]}&type=album&limit=50`;
    } else {
      const day = splittedDate[1].replace(',', '').length < 2 ? `0${splittedDate[1].replace(',', '')}` : splittedDate[1].replace(',', '');
      formattedDate = `${splittedDate[2]}-${month[splittedDate[0]]}-${day}`;
      url = `https://api.spotify.com/v1/search?q=${artist} ${removeSpecialCharacters(formattedAlbum)} year:${splittedDate[2]}&type=album&limit=50`;
    }

    console.log(`https://api.spotify.com/v1/search?q=${artist} ${formattedAlbum} year:${splittedDate[2]}&type=album&limit=50`);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      json: true,
    });

    console.log({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      json: true,
    });

    const res = await response.json();
    console.log(res);
    const { albums: { items } } = res;

    console.log(items);
    if (items.length > 1) {
      console.log('검색 결과가 2개 이상', formattedDate);
      const result = items.filter(
        (item) => item.release_date === formattedDate
          || item.artists[0].name === artist
          || item.name === formattedAlbum,
      );

      console.log(result);
      dispatch(setAlbumId(result[0].id));
      return;
    }

    dispatch(setAlbumId(items[0].id));
  };

  useEffect(() => {
    if (!albumId) { handleClick(null, albums[0].artist, albums[0].album, albums[0].releaseDate); }
  }, []);

  return (
    <MainContainer>

      {/* <DropDownContainer>
        <DropDownHeader onClick={handleToggle} isOpen={isOpen}>{year}</DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {years.map((availableYear) => (
                <ListItem
                  onClick={() => onOptionClicked(availableYear)}
                  key={Math.random()}
                  selected={availableYear === year}
                >
                  {availableYear}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer> */}

      <ContainerBody>
        {/* <Side>
          <iframe
            src={`https://open.spotify.com/embed/album/${albumId}`}
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="web-player"
          />
        </Side> */}

        <Grid id="grid" onScroll={onScroll}>
          {albums.map((album) => (
            <Container key={album.rank}>
              <a href={`${baseUrl}${album.detailUrl}`} target="_blank" rel="noreferrer" onClick={(event) => handleClick(event, album.artist, album.album, album.releaseDate)}>
                <ImageContainer>
                  <Image imageUrl={`${baseUrl}${album.coverArtThumbNail}`} />
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

        {/* <Side>
          <iframe
            src={`https://open.spotify.com/embed/album/${albumId}`}
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="web-player"
          />
        </Side> */}
      </ContainerBody>
    </MainContainer>
  );
}
