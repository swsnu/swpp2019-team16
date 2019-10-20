import React from 'react';
import DetailPage from './DetailPage';
import { render, fireEvent } from '@testing-library/react';

describe('<DetailPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<DetailPage />);
    expect(container).toMatchSnapshot();
  });
});
