import React from 'react';
import IntroContainer from './IntroContainer';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<IntroContainer />', () => {
  const state = {
    user: {
      user: null,
    },
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/intro']}>
        <Route component={IntroContainer} path="/intro" />
      </MemoryRouter>,
      state,
    );
    expect(container).toMatchSnapshot();
  });
});
