import React from 'react';
import RequestCallPage from './RequestCallPage';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { mockRider } from '../../types/__mock__/user';
import { mockRiderAuth } from '../../types/__mock__/auth';

describe('<RequestCallPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const state = {
      user: {
        user: mockRider,
      },
      group: {
        group: null,
      },
      auth: {
        auth: mockRiderAuth,
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
