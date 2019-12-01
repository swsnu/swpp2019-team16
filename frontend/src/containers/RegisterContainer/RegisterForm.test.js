import React from 'react';
import RegisterForm from './RegisterForm';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<RegisterForm />', () => {
  const state = {
    auth: {
      register: {
        email: 'email',
        password: 'password',
        vehicleInfo: 'info',
      },
    },
    passwordConfirmation: 'password',
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/register']}>
        <Route component={RegisterForm} path="/register" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
