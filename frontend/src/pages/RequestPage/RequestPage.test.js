import React from 'react';
import RequestPage from './RequestPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from 'test/utils';
import { mockRider } from '../../types/__mock__/user';
import { mockRiderAuth } from '../../types/__mock__/auth';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<RequestPage />', () => {
  const state = {
    user: {
      user: mockRider,
    },
    auth: {
      auth: mockRiderAuth,
    },
  };

  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/request']}>
        <Route component={RequestPage} path="/request" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
