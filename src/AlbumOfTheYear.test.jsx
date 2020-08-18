import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import AlbumOfTheYear from './AlbumOfTheYear';

import albums from '../fixtures/albums';

jest.mock('react-redux');

describe('AlbumOfTheYear', () => {
  const handleScroll = jest.fn();

  const currentYear = new Date().getFullYear();
  const currentYearAlbums = {
    [currentYear]: albums,
  };

  beforeEach(() => {
    handleScroll.mockClear();
  });

  it('renders initial page', () => {
    const { container, getByText } = render((
      <AlbumOfTheYear albums={currentYearAlbums[currentYear]} year={currentYear} onScroll={handleScroll} />
    ));

    expect(container).toHaveTextContent('H.E.A.T');

    expect(getByText('H.E.A.T').parentElement).toHaveAttribute('href', `https://www.metalkingdom.net${currentYearAlbums[currentYear][1].detailUrl}`);
  });

  it('occurs scroll events', () => {
    const { container } = render((
      <AlbumOfTheYear albums={currentYearAlbums[currentYear]} year={currentYear} onScroll={handleScroll} />
    ));

    const grid = container.querySelector('#grid');

    fireEvent.scroll(grid, { target: { scrollY: 100 } });

    expect(handleScroll).toBeCalled();
  });
});
