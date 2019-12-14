import React from 'react';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['']}>
        <Route component={NotFound} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
