import React from 'react';
import RiderDetailPage from './RiderDetailPage';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<RiderDetailPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const state = {
      auth: {
        auth: {
          id: 1,
        },
      },

      user: {
        user: {
          user: {
            id: 1,
          },
        },
      },
      group: {
        group: {
          groupId: 1,
        },
      },
    };

    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/riderdetail']}>
        <Route component={RiderDetailPage} path={'/riderdetail'} />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
