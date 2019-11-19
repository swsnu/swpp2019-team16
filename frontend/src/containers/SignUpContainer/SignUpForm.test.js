import React from 'react';
import SignUpForm from './SignUpForm';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<SignUpForm />', () => {
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
      <MemoryRouter initialEntries={['/signup']}>
        <Route component={SignUpForm} path="/signup" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
