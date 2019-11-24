import React from 'react';
import RequestPage from './RequestPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from 'test/utils';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<RequestPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/request']}>
        <Route component={RequestPage} path="/request" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
