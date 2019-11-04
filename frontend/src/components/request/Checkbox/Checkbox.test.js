import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('<Checkbox />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(
      <Checkbox children={<div>Checkbox Test</div>} />,
    );

    expect(container).toMatchSnapshot();
  });
});
