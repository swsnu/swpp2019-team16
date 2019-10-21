import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('<Header />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
