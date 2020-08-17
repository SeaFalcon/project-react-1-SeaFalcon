const initialState = {
  albums: {},
  currentYear: null,
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
};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return (reducers[action.type] || defaultReducer)(state, action);
}
