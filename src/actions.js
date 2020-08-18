import { fetchAlbums, fetchAvailableYears } from './services/api';

export function setAlbums({ year, albums }) {
  return {
    type: 'setAlbums',
    payload: { year, albums },
  };
}

export function setAvailableYears(years) {
  return {
    type: 'setAvailableYears',
    payload: { years },
  };
}

export function loadInitialData({ year, page, limit } = {}) {
  return async (dispatch, getState) => {
    if (getState().albums[year]) return;

    const {
      data: { albums },
      data: { year: albumYear },
    } = await fetchAlbums({ year, page, limit });

    dispatch(setAlbums({ year: albumYear, albums }));

    if (getState().availableYears.length) return;

    const years = await fetchAvailableYears();

    dispatch(setAvailableYears(years));
  };
}

export function setYear(year) {
  return {
    type: 'setYear',
    payload: { year },
  };
}

export function changeDropDownIsOpen() {
  return {
    type: 'changeDropDownIsOpen',
  };
}
