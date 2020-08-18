import React from 'react';

import { useSelector } from 'react-redux';

import AlbumOfTheYear from './AlbumOfTheYear';
import LoadingPage from './LoadingPage';

import { isEmptyObject, get } from './utils';

export default function AlbumOfTheYearContainer() {
  const albums = useSelector(get('albums'));
  const year = useSelector(get('currentYear'));
  const availableYears = useSelector(get('availableYears'));
  const isOpen = useSelector(get('dropDownIsOpen'));

  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight === scrollHeight) {
      // todo...
    }
  }

  if (!isEmptyObject(albums) && albums[year]) {
    return (
      <AlbumOfTheYear
        albums={albums[year]}
        year={year}
        availableYears={availableYears}
        onScroll={handleScroll}
        isOpen={isOpen}
      />
    );
  }

  return <LoadingPage />;
}
