const initialState = {
  albums: {},
  currentYear: new Date().getFullYear(),
  currentPage: 1,
  currentLimit: 30,
  availableYears: [],
  dropDownIsOpen: false,
};

const reducers = {
  setAlbums(state, { payload: { year, albums } }) {
    return {
      ...state,
      currentYear: year,
      albums: {
        ...state.albums,
        [year]: albums,
      },
    };
  },

  setAvailableYears(state, { payload: { years } }) {
    return {
      ...state,
      availableYears: years,
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
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
