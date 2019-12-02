import React from 'react';
import DriverFinalContainer from './DriverFinalContainer';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

describe('<DriverFinalContainer />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/drivefinal']}>
        <Route component={DriverFinalContainer} path="/driverfinal" />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
