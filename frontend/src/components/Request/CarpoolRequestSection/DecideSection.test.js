import React from 'react';
import { render } from '@testing-library/react';
import DecideSection from './DecideSection';

describe('<DecideSection />', () => {
  it('should match with snapshot - default', async () => {
    const { container } = render(<DecideSection onClick={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
