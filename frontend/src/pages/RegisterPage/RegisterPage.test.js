import React from 'react';
import RegisterPage from './RegisterPage';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<RegisterPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter intialEntries={['/register']}>
        <Route component={RegisterPage} path="/register" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
