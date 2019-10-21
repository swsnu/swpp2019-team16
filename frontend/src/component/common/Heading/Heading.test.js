import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Heading from './';

describe('<Heading />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<Heading title="Heading title" />);
    expect(container).toMatchSnapshot();
  });
});
