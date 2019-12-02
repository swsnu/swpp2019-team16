import React from 'react';
import DriverDetailPage from './DriverDetailPage';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<DriverDetailPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const state = {
      user: {
        user: {
          id:1
        },
      },
      group: {
        group: {
          groupId: 1
        },
      },
    };

    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/driverdetail']}>
        <Route component={DriverDetailPage} path={'/driverdetail'} />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
