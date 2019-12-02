import React from 'react';
import DetailPage from './DetailPage';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<DetailPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter intialEntries={['/detail']}>
        <Route component={DetailPage} path="/detail" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
