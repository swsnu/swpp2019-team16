import React from 'react';
import App from './App';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('<App />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
