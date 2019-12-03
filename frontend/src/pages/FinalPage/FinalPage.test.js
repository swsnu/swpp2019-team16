import React from 'react';
import FinalPage from './FinalPage';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<FinalPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter intialEntries={['/final']}>
        <Route component={FinalPage} path="/final" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
