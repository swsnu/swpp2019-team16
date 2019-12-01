import React from 'react';
import LoginPage from './LoginPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from 'test/utils';

describe('<LoginPage />', () => {
  const initialState = {
    auth: {
      login: {
        email: '',
        password: '',
      },
      auth: null,
    }
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginPage} path="/login" />
      </MemoryRouter>,
      initialState,
    );
    expect(container).toMatchSnapshot();
  });
});
