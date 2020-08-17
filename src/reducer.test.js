import reducer from './reducer';

describe('reducer', () => {
  it('use defaultReducer', () => {
    const initialState = { testValue: 'test' };

    const state = reducer(initialState, { type: 'test' });

    expect(state).toEqual(initialState);
  });
});
