import React from 'react';

import { useSelector } from 'react-redux';

import AlbumOfTheYear from './AlbumOfTheYear';
import LoadingPage from './LoadingPage';

export default function AlbumOfTheYearContainer() {
  const { albums, currentYear } = useSelector((state) => state);

  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight === scrollHeight) {
      // todo...
    }
  }

  if (albums && currentYear) {
    return <AlbumOfTheYear albums={albums} year={currentYear} onScroll={handleScroll} />;
  }

  return <LoadingPage />;
}
