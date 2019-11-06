import React from 'react';
import IntroPage from './IntroPage';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { redenerWithRedux, renderWithRedux } from 'test/utils';

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
