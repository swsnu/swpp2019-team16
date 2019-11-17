import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IntroContainer from './IntroContainer';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<IntroContainer />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/intro']}>
        <Route component={IntroContainer} path="/intro" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
