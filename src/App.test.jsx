import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import albums from '../fixtures/albums';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      currentYear: 2020,
      albums: {
        2020: albums,
      },
    }));
  });

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  context('with path /', () => {
    it('renders initial page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Album Of The Year');
    });
  });

  context('with path /search', () => {
    it('renders search page', () => {
      const { container } = renderApp({ path: '/search' });

      expect(container).toHaveTextContent('Search');
    });
  });
});
