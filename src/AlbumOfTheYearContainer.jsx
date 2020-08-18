import React from 'react';

import { useSelector } from 'react-redux';

import AlbumOfTheYear from './AlbumOfTheYear';
import LoadingPage from './LoadingPage';

import { isEmptyObject, get } from './utils';

export default function AlbumOfTheYearContainer() {
  const albums = useSelector(get('albums'));
  const year = useSelector(get('currentYear'));

  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight === scrollHeight) {
      // todo...
    }
  }

  if (!isEmptyObject(albums)) {
    return <AlbumOfTheYear albums={albums} year={year} onScroll={handleScroll} />;
  }

  return <LoadingPage />;
}
