import reducer from './reducer';

import { setAlbums } from './actions';

import albums from '../fixtures/albums';

describe('reducer', () => {
  it('use defaultReducer', () => {
    const initialState = { albums: [] };

    const state = reducer(initialState, { type: 'test' });

    expect(state).toEqual(initialState);
  });

  describe('setAlbums', () => {
    it('change albums and currentYear', () => {
      const initialState = {
        albums: [],
      };

      const currentYear = new Date().getFullYear();

      const state = reducer(initialState, setAlbums({ year: currentYear, albums }));

      expect(state.albums[currentYear]).toEqual(albums);
      expect(state.currentYear).toEqual(currentYear);
    });
  });
});
