import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('<Login />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(
      <Login onLoginRequest={() => {}} onRegisterRequest={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
