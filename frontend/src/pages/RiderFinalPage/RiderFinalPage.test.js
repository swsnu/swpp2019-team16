import React from 'react';
import RiderFinalPage from './RiderFinalPage';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<RiderFinalPage />', () => {
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
            id:1
          },
          point: 50000
        },
      },
      group: {
        group: {
          gourpId:1,
          cost: 5000,
        },
      },
    };

    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/driverfinal']}>
        <Route component={RiderFinalPage} path={'/riderfinal'} />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
