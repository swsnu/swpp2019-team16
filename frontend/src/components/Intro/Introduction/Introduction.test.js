import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Introduction from './Introduction';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<Introduction />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<Introduction onStart={() => {}} />);
    expect(container).toMatchSnapshot();
  });
});
