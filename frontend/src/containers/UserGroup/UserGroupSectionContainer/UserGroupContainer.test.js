import React from 'react';
import UserGroupContainer from './UserGroupContainer';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import expectExport from 'expect';

jest.mock('../../../components/UserGroup/UserGroupSection', () =>
  jest.fn(props => <div></div>),
);

describe('<UserGroupSectionContainer />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/group']}>
        <Route component={UserGroupContainer} path="/group" />
      </MemoryRouter>,
    );
    expectExport(container).toMatchSnapshot();
  });
});
