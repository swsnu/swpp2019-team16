import React from 'react';
import FinalPage from './FinalPage';
import { render, fireEvent } from '@testing-library/react';

describe('<FinalPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<FinalPage />);
    expect(container).toMatchSnapshot();
  });
});
