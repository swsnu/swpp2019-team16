import React from 'react';
import { render } from '@testing-library/react';
import WaitingSection from './WaitingSection';

describe('<WaitingSection />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<WaitingSection />);

    expect(container).toMatchSnapshot();
  });
});
