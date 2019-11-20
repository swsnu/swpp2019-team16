import React from 'react';
import SignUpPage from './SignUpPage';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<SignUpPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter intialEntries={['/signup']}>
        <Route component={SignUpPage} path="/signup" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
