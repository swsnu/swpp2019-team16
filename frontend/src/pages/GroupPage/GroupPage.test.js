import React from 'react';
import GroupPage from './GroupPage';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<GroupPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter intialEntries={['/group']}>
        <Route component={GroupPage} path="/group" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
