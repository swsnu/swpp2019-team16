import React from 'react';
import RequestCallPage from './RequestCallPage';
import { render, fireEvent } from '@testing-library/react';

describe('<RequestCallPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<RequestCallPage />);
    expect(container).toMatchSnapshot();
  });
});
