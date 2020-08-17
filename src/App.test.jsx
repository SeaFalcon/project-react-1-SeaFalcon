import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import albums from '../fixtures/albums';

jest.mock('react-redux');

describe('App', () => {
  it('renders initial page', () => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      currentYear: 2020,
      albums: {
        2020: albums,
      },
    }));

    const { container } = render((
      <App />
    ));

    expect(container).toHaveTextContent('Album Of The Year');
  });
});
