import React from 'react';
import RequestContainer from './CarpoolRequestSectionContainer';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { mockRider } from '../../../types/__mock__/user';

jest.mock('../../../components/Request/CarpoolRequestSection', () =>
  jest.fn(props => <div>Request</div>),
);

describe('<CarpoolRequestSectionContainer />', () => {
  const state = {
    user: {
      user: mockRider,
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
