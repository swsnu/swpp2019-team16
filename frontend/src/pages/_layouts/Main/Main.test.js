import React from 'react';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import Main from './Main';

describe('<Main />', () => {
  const state = {
    auth: {
      auth: null,
    },
  };
  const children = { children: 1 };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/']}>
        <Route component={Main} path="/" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
