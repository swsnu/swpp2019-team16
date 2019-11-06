import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Introduction from './Introduction';

describe('<Introduction />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<Introduction onStart={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
