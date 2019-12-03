import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import RequestContainer from './CarpoolRequestSectionContainer';
import { renderWithRedux } from '../../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { mockRider } from '../../../types/__mock__/user';

jest.mock('../../../components/Request/CarpoolRequestSection', () =>
  jest.fn(props => (
    <div>
      <button
        onClick={() =>
          props.onCarpoolRequest({
            riderId: 1,
            from: 'A',
            to: 'B',
            minimumPassenger: '2',
          })
        }
      >
        request
      </button>
      <div>RequestPage</div>
    </div>
  )),
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

  it('should redirect to /login when user is not given', async () => {
    const _initialState = {
      ...state,
      user: {
        user: null,
      },
    };
    const MockLoginPage = () => <div>MockLoginPage</div>;
    const { getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/request']}>
        <Route component={RequestContainer} path="/request" />
        <Route component={MockLoginPage} path="/login" />
      </MemoryRouter>,
      _initialState,
    );

    await waitForElement(() => getByText('MockLoginPage'));

    expect(getByText('MockLoginPage')).toHaveTextContent('MockLoginPage');
  });

  it('should dispatch requestCarpool action when click request button', () => {
    const { getByText, store } = renderWithRedux(
      <MemoryRouter initialEntries={['/request']}>
        <Route component={RequestContainer} path="/request" />
      </MemoryRouter>,
      state,
    );

    fireEvent.click(getByText('request'));

    const fetchedActions = store.getActions();
    expect(fetchedActions.length).toBe(1);
    expect(fetchedActions[0]).toStrictEqual({
      type: 'carpoolRequest/REQUEST_CARPOOL',
      payload: {
        riderId: 1,
        from: 'A',
        to: 'B',
        minimumPassenger: '2',
      },
    });
  });

  it('should redirect to /waiting when click request button', async () => {
    const MockWaitingPage = () => <div>MockWaitingPage</div>;
    const { getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/request']}>
        <Route component={RequestContainer} path="/request" />
        <Route component={MockWaitingPage} path="/waiting" />
      </MemoryRouter>,
      state,
    );

    fireEvent.click(getByText('request'));

    await waitForElement(() => getByText('MockWaitingPage'));

    expect(getByText('MockWaitingPage')).toHaveTextContent('MockWaitingPage');
  });
});
