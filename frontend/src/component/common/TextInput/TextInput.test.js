import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextInput from './';

describe('<TextInput />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(<TextInput label="TextInput Label" />);
    expect(container).toMatchSnapshot();
  });
});
