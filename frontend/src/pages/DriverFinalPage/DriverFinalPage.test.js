import React from 'react';
import DriverFinalPage from './DriverFinalPage';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<DriverFinalPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const state = {
      user: {
        user: {
          id: 1,
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
        <Route component={DriverFinalPage} path={'/driverfinal'} />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
