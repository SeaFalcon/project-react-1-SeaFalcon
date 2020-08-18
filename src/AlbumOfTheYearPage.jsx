import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AlbumOfTheYearContainer from './AlbumOfTheYearContainer';

import { loadInitialData, loadYearInfomation } from './actions';

import { get } from './utils';

export default function AlbumOfTheYearPage() {
  const dispatch = useDispatch();

  const year = useSelector(get('currentYear'));

  useEffect(() => {
    dispatch(loadYearInfomation());
    dispatch(loadInitialData(year));
  }, [year]);

  return (
    <div>
      <AlbumOfTheYearContainer />
    </div>
  );
}
