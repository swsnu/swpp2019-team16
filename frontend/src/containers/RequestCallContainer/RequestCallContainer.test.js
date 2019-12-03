import React from 'react';
import { waitForElement } from '@testing-library/react';
import RequestCallContainer, {
  GROUP_CREATED_EVENT,
} from './RequestCallContainer';
import * as grpcClient from '../../lib/grpc/client';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import { mockDriver } from '../../types/__mock__/user';

class MockGrpcStream {
  registeredCallback = null;

  on(event, callback) {
    this.registeredCallback = callback;
  }

  cancel() {}
}

class MockMessage {
  constructor(data) {
    this.data = JSON.stringify(data);
  }
  getData() {
    return this.data;
  }
}

describe('<RequestCallContainer />', () => {
  const initialState = {
    user: {
      user: mockDriver,
    },
    group: {
      group: null,
    },
  };
  it('should create grpc stream', () => {
    jest.spyOn(grpcClient, 'createGrpcStream').mockImplementation(() => {
      return new MockGrpcStream();
    });

    renderWithRedux(
      <MemoryRouter intialEntries={['/']}>
        <Route path={'/'} component={RequestCallContainer} />
      </MemoryRouter>,
      initialState,
    );
    expect(grpcClient.createGrpcStream).toHaveBeenCalledTimes(1);
  });

  it('should dispatch groupCreated action when message type is GROUP_CREATED_EVENT', () => {
    const mockGrpcStream = new MockGrpcStream();
    jest.spyOn(grpcClient, 'createGrpcStream').mockImplementation(() => {
      return mockGrpcStream;
    });

    const { store } = renderWithRedux(
      <MemoryRouter intialEntries={['/']}>
        <Route path={'/'} component={RequestCallContainer} />
      </MemoryRouter>,
      initialState,
    );
    mockGrpcStream.registeredCallback(
      new MockMessage({
        _type_name: GROUP_CREATED_EVENT,
        _from_location: 'LOCATION_A',
        _to_location: 'LOCATION_B',
      }),
    );

    const fetchedActions = store.getActions();
    expect(fetchedActions.length).toBe(1);
    expect(fetchedActions[0]).toStrictEqual({
      type: 'group/GROUP_CREATED',
      payload: {
        groupId: undefined,
        from: 'LOCATION_A',
        to: 'LOCATION_B',
      },
    });
  });

  it('should dispatch unloadGroup when component unmount', () => {
    jest.spyOn(grpcClient, 'createGrpcStream').mockImplementation(() => {
      return new MockGrpcStream();
    });

    const { unmount, store } = renderWithRedux(
      <MemoryRouter intialEntries={['/']}>
        <Route path={'/'} component={RequestCallContainer} />
      </MemoryRouter>,
      initialState,
    );

    unmount();

    const fetchedActions = store.getActions();
    expect(fetchedActions.length).toBe(1);
    expect(fetchedActions[0]).toStrictEqual({
      type: 'group/UNLOAD_GROUP',
    });
  });
});
