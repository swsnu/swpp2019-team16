import React from 'react';
import RequestPage from './RequestPage';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from 'test/utils';

describe('<RequestPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/request']}>
        <Route component={RequestPage} path="/request" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
