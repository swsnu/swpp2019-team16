import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Box from './';

describe('<Box />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<Box children={<div>Box Text</div>} />);

    expect(container).toMatchSnapshot();
  });
});
