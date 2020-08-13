import React from 'react';

import { render } from '@testing-library/react';

import Search from './Search';

test('Search', () => {
  const { getByLabelText } = render((
    <Search />
  ));

  expect(getByLabelText('Search')).toBeInTheDocument();
});
