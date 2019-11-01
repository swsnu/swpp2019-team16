import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthForm from './AuthForm';

describe('<AuthForm />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(
      <AuthForm
        form={{
          username: 'yata',
          password: 'yata',
        }}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});