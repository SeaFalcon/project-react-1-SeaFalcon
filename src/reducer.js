const initialState = {};

function defaultReducer(state) {
  return state;
}

export default function reducer(state = initialState, action) {
  return defaultReducer(state, action);
}
