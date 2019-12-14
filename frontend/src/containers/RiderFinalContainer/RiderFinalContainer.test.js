import React from 'react';
import RiderFinalContainer from './RiderFinalContainer';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { mockRider } from 'types/__mock__/user';
import { mockGroup } from 'types/__mock__/group';

describe('<RiderFinalContainer />', () => {
  it('SHOULD match with snapshot', async () => {
    const state = {
      user: {
        user: mockRider,
      },
      group : mockGroup,
    };

    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/riderfinal']}>
        <Route component={RiderFinalContainer} path="/riderfinal" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
