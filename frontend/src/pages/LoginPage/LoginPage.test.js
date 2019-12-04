import React from 'react';
import LoginPage from './LoginPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from 'test/utils';
import { mockDriver } from '../../types/__mock__/user';

describe('<LoginPage />', () => {
  const initialState = {
    auth: {
      login: {
        email: '',
        password: '',
      },
      auth: null,
    },
    user: {
      user: mockDriver,
    },
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
