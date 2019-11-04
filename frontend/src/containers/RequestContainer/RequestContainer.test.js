import React from 'react';
import RequestContainer from './RequestContainer';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('../../components/Request', () => jest.fn(props => <div></div>));

describe('<RequestContainer />', () => {
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
