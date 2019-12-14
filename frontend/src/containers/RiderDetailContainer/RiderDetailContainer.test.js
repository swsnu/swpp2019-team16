import React from 'react';
import RiderDetailContainer from './RiderDetailContainer';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<RiderDetailContainer />', () => {
  const initialState = {
    user: {
      user: {
        user: { id: 1 },
      },
    },
    group: {
      group: { groupId: 1 },
    },
  };

  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/riderdetail']}>
        <Route component={RiderDetailContainer} path="/riderdetail" />
      </MemoryRouter>,
      initialState,
    );
    expect(container).toMatchSnapshot();
  });
});
