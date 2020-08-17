import React from 'react';

import styled from '@emotion/styled';

const Loading = styled.h2({
  fontSize: '2em',
  marginTop: '20px',
  marginLeft: '20px',
});

export default function LoadingPage() {
  return (
    <Loading>Loading...</Loading>
  );
}
