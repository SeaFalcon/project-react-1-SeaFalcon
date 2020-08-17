import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import AlbumOfTheYearContainer from './AlbumOfTheYearContainer';

import albums from '../fixtures/albums';

jest.mock('react-redux');

describe('AlbumOfTheYearContainer', () => {
  it('renders initial page', () => {
    useSelector.mockImplementation((selector) => selector({
      currentYear: 2020,
      albums: {
        2020: albums,
      },
    }));

    const { container } = render((
      <AlbumOfTheYearContainer />
    ));

    expect(container).toHaveTextContent('H.E.A.T');
  });
});
