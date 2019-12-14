import React from 'react';
import WaitingPage from './WaitingPage';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from '../../test/utils';
import { mockRider } from '../../types/__mock__/user';
import { mockGroup } from '../../types/__mock__/group';

describe('<WaitingPage />', () => {
  const initialState = {
    user: {
      user: mockRider,
    },
    group: {
      group: mockGroup,
    },
  };

  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter>
        <Route path="/" component={WaitingPage} />
      </MemoryRouter>,
      initialState,
    );
    expect(container).toMatchSnapshot();
  });
});
