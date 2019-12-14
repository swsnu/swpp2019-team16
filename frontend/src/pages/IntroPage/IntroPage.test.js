import React from 'react';
import IntroPage from './IntroPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from '../../test/utils';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<IntroPage />', () => {
  const state = {
    auth: {
      auth: {
        id: 1,
      },
    },
    user: {
      user: null,
    },
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/intro']}>
        <Route component={IntroPage} path="/intro" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
