import { fetchAlbums, fetchAvailableYears } from './services/api';

import { isEmptyObject } from './utils';

export function setAlbums({ year, albums }) {
  return {
    type: 'setAlbums',
    payload: { year, albums },
  };
}

export function initializeAvailableYears(years) {
  return {
    type: 'initializeAvailableYears',
    payload: { years },
  };
}

export function loadInitialData(year) {
  return async (dispatch, getState) => {
    const { currentPage, currentLimit, albums: previousAlbums } = getState();

    if (previousAlbums[year]) return;

    const {
      data: { albums, year: albumYear },
    } = await fetchAlbums({ year, page: currentPage, limit: currentLimit });

    dispatch(setAlbums({ year: albumYear, albums }));
  };
}

export function loadYearInfomation() {
  return async (dispatch, getState) => {
    const { availableYears } = getState();

    if (!isEmptyObject(availableYears)) return;

    const years = await fetchAvailableYears();

    dispatch(initializeAvailableYears(years));
  };
}

export function updateAvailableYearsEndOfPage(endOfPage) {
  return {
    type: 'updateAvailableYearsEndOfPage',
    payload: { endOfPage },
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

export function setPage(page) {
  return {
    type: 'setPage',
    payload: { page },
  };
}

export function loadMoreData() {
  return async (dispatch, getState) => {
    const {
      availableYears, currentYear, currentLimit,
    } = getState();

    const { page, endOfPage } = availableYears[currentYear];

    if (endOfPage !== 0) return;

    const {
      data: { albums, albumCount, year: albumYear },
    } = await fetchAlbums({ year: currentYear, page: page + 1, limit: currentLimit });

    dispatch(setAlbums({ year: albumYear, albums }));
    dispatch(setPage(page + 1));

    if (albums.find((album) => +album.rank === albumCount)) {
      dispatch(updateAvailableYearsEndOfPage(page + 1));
    }
  };
}

export function setAlbumId(albumId) {
  return {
    type: 'setAlbumId',
    payload: { albumId },
  };
}

export function setUserInformation(userInformation) {
  return {
    type: 'setUserInformation',
    payload: { userInformation },
  };
}

export function setAccessToken(accessToken) {
  return {
    type: 'setAccessToken',
    payload: { accessToken },
  };
}

export function setSearchQuery(searchQuery) {
  return {
    type: 'setSearchQuery',
    payload: { searchQuery },
  };
}

export function setSearchResult(searchResult) {
  return {
    type: 'setSearchResult',
    payload: { searchResult },
  };
}
