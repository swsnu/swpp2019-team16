import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<Button children={<div>Button Text</div>} />);

    expect(container).toMatchSnapshot();
  });
});
