import React from 'react';
import NotFoundPage from './NotFoundPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from 'test/utils';

describe('<NotFoundPage />', () => {
  const initialState = {
    user: {
      user: null,
    },
    auth: {
      auth: null,
    },
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['']}>
        <Route component={NotFoundPage} />
      </MemoryRouter>,
      initialState,
    );
    expect(container).toMatchSnapshot();
  });
});
