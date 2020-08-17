import fetchAlbums from './services/api';

export function setAlbums({ year, albums }) {
  return {
    type: 'setAlbums',
    payload: { year, albums },
  };
}

export function loadInitialData({ year, page, limit } = {}) {
  return async (dispatch) => {
    const {
      data: { albums },
      data: { year: albumYear },
    } = await fetchAlbums({ year, page, limit });

    dispatch(setAlbums({ year: albumYear, albums }));
  };
}
