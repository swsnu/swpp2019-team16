import React from 'react';
import WaitingPage from './WaitingPage';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderWithRedux } from '../../test/utils';

describe('<WaitingPage />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter>
        <Route path="/" component={WaitingPage} />
      </MemoryRouter>,
      {
        group: {
          group: null,
        },
      },
    );
    expect(container).toMatchSnapshot();
  });
});
