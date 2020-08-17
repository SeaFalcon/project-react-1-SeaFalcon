import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import AlbumOfTheYearContainer from './AlbumOfTheYearContainer';

import { loadInitialData } from './actions';

export default function AlbumOfTheYearPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialData({ year: new Date().getFullYear(), page: 1, limit: 20 }));
  }, []);

  return (
    <div>
      <AlbumOfTheYearContainer />
    </div>
  );
}
