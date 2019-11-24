import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Rider from './Rider';
import Driver from './Driver';

describe('<SignUp />', () => {
  const signUpMode = {
    rider: 'rider',
    driver: 'driver',
  };

  it('SHOULD match with snapshot WHEN rider', async () => {
    const form = { email: 'dkim94', password: '123' };
    const mode = signUpMode.rider;

    const { container } = render(
      <Rider form={form} onChange={() => {}} onClick={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('SHOULD match with snapshot WHEN driver', async () => {
    const form = {
      email: 'dkim94',
      password: '123',
      carType: 'BMW',
      plateNo: '123',
    };
    const mode = signUpMode.driver;

    const { container } = render(
      <Driver form={form} onChange={() => {}} onClick={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
