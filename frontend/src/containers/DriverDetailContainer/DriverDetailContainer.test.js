import React from 'react';
import DriverDetailContainer from './DriverDetailContainer';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<DriverDetailContainer />', () => {
  const initialState = {
    user: {
      user: {
        id: 1,
        user: {
          id: 2,
        },
      },
    },
    group: {
      group: { groupId: 1 },
    },
  };

  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/driverdetail']}>
        <Route component={DriverDetailContainer} path="/driverdetail" />
      </MemoryRouter>,
      initialState,
    );
    expect(container).toMatchSnapshot();
  });
});
