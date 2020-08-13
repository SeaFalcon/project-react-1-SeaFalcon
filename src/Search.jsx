import React from 'react';

import styled from '@emotion/styled';

const SearchBar = styled.input({
  all: 'unset',
  fontSize: '2.25em',
  width: '100%',
  marginTop: '20px',
  marginLeft: '20px',
  display: 'block',
  backgroundColor: 'rgba(20, 20, 20, 1)',
});

export default function Search() {
  return (
    <form>
      <label htmlFor="search-music" hidden>Search</label>
      <SearchBar type="text" id="search-music" placeholder="Search Artist or Album or Music Track" />
    </form>
  );
}
