import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Container from './Container';
import Button from '../Button/Button';

describe('<Container />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<Button children={<div>Container Content</div>} />);

    expect(container).toMatchSnapshot();
  });
});
