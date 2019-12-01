import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

describe('<Login />', () => {
  it('SHOULD match with snapshot', async () => {
    const loginInfo = {
      email: 'email',
      password: 'password',
    };
    const { container } = render(
      <Login
        loginInfo={loginInfo}
        onChange={() => {}}
        onClickLogin={() => {}}
        onClickRegister={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
