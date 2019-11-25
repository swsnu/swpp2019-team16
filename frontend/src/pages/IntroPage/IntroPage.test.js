import React from 'react';
import IntroPage from './IntroPage';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from '../../test/utils';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<IntroPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/intro']}>
        <Route component={IntroPage} path="/intro" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
