import React from 'react';
import LoginPage from './LoginPage';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { redenerWithRedux, renderWithRedux } from 'test/utils';

describe('<LoginPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginPage} path="/login" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
