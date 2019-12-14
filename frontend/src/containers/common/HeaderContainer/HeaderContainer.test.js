import React from 'react';
import HeaderContainer from './HeaderContainer';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<HeaderContainer />', () => {
  const state = {
    user: {
      user: null,
    },
    auth: {
      auth: null,
    },
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/']}>
        <Route component={HeaderContainer} path="/" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
