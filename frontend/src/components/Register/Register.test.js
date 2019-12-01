import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Rider from './Rider';
import Driver from './Driver';

describe('<Register />', () => {
  const registerMode = {
    rider: 'rider',
    driver: 'driver',
  };

  it('SHOULD match with snapshot WHEN rider', async () => {
    const form = { email: 'dkim94', password: '123' };
    const mode = registerMode.rider;

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
    const mode = registerMode.driver;

    const { container } = render(
      <Driver form={form} onChange={() => {}} onClick={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
