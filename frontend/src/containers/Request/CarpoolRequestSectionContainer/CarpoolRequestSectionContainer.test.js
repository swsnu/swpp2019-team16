import React from 'react';
import RequestContainer from './CarpoolRequestSectionContainer';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('../../../components/Request/CarpoolRequestSection', () =>
  jest.fn(props => <div>Request</div>),
);

describe('<CarpoolRequestSectionContainer />', () => {
  const state = {
    user: {
      user: {
        id: 1,
      },
    },
  };

  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/request']}>
        <Route component={RequestContainer} path="/request" />
      </MemoryRouter>,
      state,
    );

    expect(container).toMatchSnapshot();
  });
});
