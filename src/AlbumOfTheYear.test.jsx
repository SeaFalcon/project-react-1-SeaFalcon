import React from 'react';

import { render } from '@testing-library/react';

import AlbumOfTheYear from './AlbumOfTheYear';

describe('AlbumOfTheYear', () => {
  it('renders initial page', () => {
    const { container } = render((
      <AlbumOfTheYear />
    ));

    expect(container).toHaveTextContent('H.E.A.T');
  });
});
