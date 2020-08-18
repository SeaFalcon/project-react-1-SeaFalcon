const initialState = {
  albums: {},
  currentYear: new Date().getFullYear(),
  currentPage: 1,
  currentLimit: 30,
  availableYears: {},
  dropDownIsOpen: false,
};

const reducers = {
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
