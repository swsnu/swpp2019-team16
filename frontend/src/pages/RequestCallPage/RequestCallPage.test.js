import React from 'react';
import RequestCallPage from './RequestCallPage';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<RequestCallPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const state = {
      user: {
        user: {id:1},
      },
      group: {
        group: null,
      },
    };

    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/requestcall']}>
        <Route component={RequestCallPage} path={'/requestcall'} />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
