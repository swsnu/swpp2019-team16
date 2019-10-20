import React from 'react';
import WaitingPage from './WaitingPage';
import { render, fireEvent } from '@testing-library/react';

describe('<WaitingPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<WaitingPage />);
    expect(container).toMatchSnapshot();
  });
});
