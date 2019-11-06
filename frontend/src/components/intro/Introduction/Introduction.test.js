import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Introduction from './Introduction';
import { renderWithRedux } from 'test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<Introduction />', () => {

  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/intro']}>
        <Route component={Introduction} path='/intro'/>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

});