import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AlbumOfTheYearContainer from './AlbumOfTheYearContainer';

import { loadInitialData } from './actions';

import { get } from './utils';

export default function AlbumOfTheYearPage() {
  const dispatch = useDispatch();

  const year = useSelector(get('currentYear'));
  const page = useSelector(get('currentPage'));
  const limit = useSelector(get('currentLimit'));

  useEffect(() => {
    dispatch(loadInitialData({ year, page, limit }));
  }, [year]);

  return (
    <div>
      <AlbumOfTheYearContainer />
    </div>
  );
}
