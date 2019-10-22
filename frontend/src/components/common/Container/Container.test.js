import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';
import Button from '../Button/Button';

describe('<Container />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(
      <Container>
        <div>Container Content</div>
      </Container>,
    );

    expect(container).toMatchSnapshot();
  });
});
