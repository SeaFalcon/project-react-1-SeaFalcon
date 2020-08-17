import React from 'react';

import { render } from '@testing-library/react';

import AlbumOfTheYear from './AlbumOfTheYear';

import albums from '../fixtures/albums';

jest.mock('react-redux');

describe('AlbumOfTheYear', () => {
  it('renders initial page', () => {
    const currentYear = new Date().getFullYear();
    const currentYearAlbums = {
      [currentYear]: albums,
    };

    const { container } = render((
      <AlbumOfTheYear albums={currentYearAlbums} year={currentYear} />
    ));

    expect(container).toHaveTextContent('H.E.A.T');
  });
});
