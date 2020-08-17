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

    const { container, getByText } = render((
      <AlbumOfTheYear albums={currentYearAlbums} year={currentYear} />
    ));

    expect(container).toHaveTextContent('H.E.A.T');

    expect(getByText('H.E.A.T').parentElement).toHaveAttribute('href', `https://www.metalkingdom.net${currentYearAlbums[currentYear][1].detailUrl}`);
  });
});
