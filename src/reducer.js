const initialState = {
  albums: {},
  currentYear: new Date().getFullYear(),
  currentPage: 1,
  currentLimit: 30,
  availableYears: {},
  dropDownIsOpen: false,
  albumId: '',
  userInformation: {
    accessToken: '',
    name: '',
    email: '',
    id: '',
    image: '',
  },
  searchQuery: '',
  searchResult: null,
};

const reducers = {
  setUserInformation(state, { payload: { userInformation } }) {
    localStorage.setItem('userInformation', JSON.stringify(userInformation));

    return {
      ...state,
      userInformation,
    };
  },

  setAccessToken(state, { payload: { accessToken } }) {
    const userInformation = JSON.parse(localStorage.getItem('userInformation'));
    console.log(accessToken);
    userInformation.accessToken = accessToken;

    localStorage.setItem('userInformation', JSON.stringify(userInformation));

    return {
      ...state,
      userInformation,
    };
  },

  setSearchQuery(state, { payload: { searchQuery } }) {
    return {
      ...state,
      searchQuery,
    };
  },

  setSearchResult(state, { payload: { searchResult } }) {
    return {
      ...state,
      searchResult,
    };
  },

  setAlbumId(state, { payload: { albumId } }) {
    return {
      ...state,
      albumId: `https://open.spotify.com/embed/album/${albumId}`,
    };
  },

  setAlbums(state, { payload: { year, albums } }) {
    return {
      ...state,
      currentYear: year,
      albums: {
        ...state.albums,
        [year]:
          Object.keys(state.albums).find((album) => album === String(year))
            ? [...state.albums[year], ...albums]
            : albums,
      },
    };
  },

  initializeAvailableYears(state, { payload: { years } }) {
    const availableYears = {};

    years.forEach((year) => {
      availableYears[year] = { page: 1, endOfPage: 0 };
    });

    return {
      ...state,
      availableYears,
    };
  },

  updateAvailableYearsEndOfPage(state, { payload: { endOfPage } }) {
    const { availableYears, currentYear } = state;

    return {
      ...state,
      availableYears: {
        ...availableYears,
        [currentYear]: {
          ...availableYears[currentYear],
          endOfPage,
        },
      },
    };
  },

  setYear(state, { payload: { year } }) {
    return {
      ...state,
      currentYear: year,
    };
  },

  changeDropDownIsOpen(state) {
    return {
      ...state,
      dropDownIsOpen: !state.dropDownIsOpen,
    };
  },

  setPage(state, { payload: { page } }) {
    const { availableYears, currentYear } = state;

    return {
      ...state,
      currentPage: page,
      availableYears: {
        ...availableYears,
        [currentYear]: {
          ...availableYears[currentYear],
          page,
        },
      },
    };
  },
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
