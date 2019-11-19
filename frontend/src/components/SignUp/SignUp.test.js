import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('<SignUp />', () => {
  it('SHOULD match with snapshot WHEN all data in', async () => {
    const form = { email: 'dkim94', password: '123', vehicleInfo: '' };

    const { container } = render(
      <SignUp form={form} onChange={() => {}} onClick={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
