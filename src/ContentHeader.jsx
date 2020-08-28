import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { Switch, Route } from 'react-router-dom';

import {
  changeDropDownIsOpen, setYear, setPage, setSearchResult, setSearchQuery,
} from './actions';

import { get } from './utils';

const ContentHeader = styled.div({
  height: '10vh',
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

function Year() {
  const dispatch = useDispatch();

  const year = useSelector(get('currentYear'));
  const availableYears = useSelector(get('availableYears'));
  const isOpen = useSelector(get('dropDownIsOpen'));

  const years = Object.keys(availableYears).reverse();

  const handleToggle = () => {
    dispatch(changeDropDownIsOpen());
  };

  const onOptionClicked = (value) => {
    dispatch(setYear(value));

    const { page } = availableYears[value];

    dispatch(setPage(page));

    dispatch(changeDropDownIsOpen());
  };

  return (
    <ContentHeader>
      <DropDownContainer>
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
      </DropDownContainer>
    </ContentHeader>
  );
}

const SearchBar = styled.input({
  all: 'unset',
  height: '10vh',
  fontSize: '2.25em',
  width: '100%',
  // marginTop: '20px',
  marginLeft: '20px',
  display: 'block',
  backgroundColor: 'rgba(20, 20, 20, 1)',
});

function InputSearch() {
  const dispatch = useDispatch();

  const searchQuery = useSelector(get('searchQuery'));
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-music" hidden>Search</label>
      <SearchBar
        type="text"
        id="search-music"
        placeholder="Search Artist or Album"
        onChange={handleChange}
        value={searchQuery}
      />
    </form>
  );
}

export default () => (
  <Switch>
    <Route exact path="/" component={Year} />
    <Route path="/search" component={InputSearch} />
  </Switch>
);
