import React from 'react';
import UserGroupContainer from './UserGroupContainer';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import expectExport from 'expect';
import { mockRider } from '../../../types/__mock__/user';
import { mockGroup } from '../../../types/__mock__/group';

jest.mock('../../../components/UserGroup/UserGroupSection', () =>
  jest.fn(props => <div></div>),
);

describe('<UserGroupSectionContainer />', () => {
  const initialState = {
    user: {
      user: mockRider,
    },
    group: {
      group: mockGroup,
    },
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/group']}>
        <Route component={UserGroupContainer} path="/group" />
      </MemoryRouter>,
      initialState,
    );
    expectExport(container).toMatchSnapshot();
  });
});
