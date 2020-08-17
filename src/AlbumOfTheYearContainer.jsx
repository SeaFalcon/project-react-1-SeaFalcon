import React from 'react';

import { useSelector } from 'react-redux';

import AlbumOfTheYear from './AlbumOfTheYear';
import LoadingPage from './LoadingPage';

export default function AlbumOfTheYearContainer() {
  const { albums, currentYear } = useSelector((state) => state);

  if (albums && currentYear) {
    return <AlbumOfTheYear albums={albums} year={currentYear} />;
  }

  return <LoadingPage />;
}
