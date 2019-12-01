import React from 'react';
import LoginContainer from './LoginContainer';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<LoginContainer />', () => {
  const state = {
    auth: {
      login: {
        email: 'email',
        password: 'password',
      },
    },
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
