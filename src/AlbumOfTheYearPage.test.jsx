import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import AlbumOfTheYearPage from './AlbumOfTheYearPage';

import albums from '../fixtures/albums';

jest.mock('react-redux');

test('AlbumOfTheYearPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    currentYear: 2020,
    albums: {
      2020: albums,
    },
  }));

  const { container } = render((
    <AlbumOfTheYearPage />
  ));

  expect(container).toHaveTextContent('2020');
});
