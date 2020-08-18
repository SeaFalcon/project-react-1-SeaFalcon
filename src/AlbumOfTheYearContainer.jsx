import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AlbumOfTheYear from './AlbumOfTheYear';
import LoadingPage from './LoadingPage';

import { loadMoreData } from './actions';

import { isEmptyObject, get } from './utils';

export default function AlbumOfTheYearContainer() {
  const dispatch = useDispatch();

  const albums = useSelector(get('albums'));
  const year = useSelector(get('currentYear'));
  const availableYears = useSelector(get('availableYears'));
  const isOpen = useSelector(get('dropDownIsOpen'));

  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight === scrollHeight) {
      dispatch(loadMoreData());
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
