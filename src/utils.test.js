import { isEmptyObject, get } from './utils';

describe('isEmptyObject', () => {
  context('with emptyObject', () => {
    it('return true', () => {
      const state = {};

      const result = isEmptyObject(state);

      expect(result).toBe(true);
    });
  });

  context('with object has some key, value', () => {
    it('return false', () => {
      const state = {
        name: 'Unknown',
      };

      const result = isEmptyObject(state);

      expect(result).toBe(false);
    });
  });

  context('with other data type', () => {
    it('return false', () => {
      const state = [];

      const result = isEmptyObject(state);

      expect(result).toBe(false);
    });
  });
});

test('get', () => {
  const state = {
    name: 'Unknown',
  };

  const f = get('name');
  const g = get('height');

  expect(f(state)).toBe('Unknown');
  expect(g(state)).toBeUndefined();
});
