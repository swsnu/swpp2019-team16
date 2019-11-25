import React from 'react';
import App from './App';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from './test/utils';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<App />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter>
        <Route component={App} path="/" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
