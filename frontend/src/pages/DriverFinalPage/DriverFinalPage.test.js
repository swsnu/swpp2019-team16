import React from 'react';
import DriverFinalPage from './DriverFinalPage';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<DriverFinalPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const state = {
      auth: {
        auth: {
          id: 1,
        },
      },
      user: {
        user: {
          id: 1,
          user: {
            id: 2,
            point: 50000,
          },
        },
      },
      group: {
        group: {
          gourpId: 1,
          cost: 5000,
        },
      },
    };

    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/driverfinal']}>
        <Route component={DriverFinalPage} path={'/driverfinal'} />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
