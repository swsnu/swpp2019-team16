import React from 'react';
import { render } from '@testing-library/react';
import FullWidth from './FullWidth';

describe('<FullWidth />', () => {
  it('SHOULD match with snapshoot', async () => {
    const { container } = render(
      <FullWidth>
        <div>Full width page</div>
      </FullWidth>,
    );
    expect(container).toMatchSnapshot();
  });
});
