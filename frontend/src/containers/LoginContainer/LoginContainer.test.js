import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import LoginContainer from './LoginContainer';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('../../components/Login', () =>
  jest.fn(props => (
    <div>
      <div aria-label={'email'}>{props.loginInfo.email}</div>
      <div aria-label={'password'}>{props.loginInfo.password}</div>
      <input
        aria-label={'input-form'}
        name={'input-form'}
        onChange={props.onChange}
      />
      <button onClick={props.onClickLogin}>login</button>
      <button onClick={props.onClickRegister}>register</button>
    </div>
  )),
);

describe('<LoginContainer />', () => {
  const state = {
    auth: {
      login: {
        email: '',
        password: '',
      },
      auth: null,
    },
    user: {
      user: null,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch initializeForm action', () => {
    const { store } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      state,
    );
    const fetchedActions = store.getActions();
    expect(fetchedActions.length).toBe(1);
    expect(fetchedActions[0]).toStrictEqual({
      type: 'auth/INITIALIZE_FORM',
      payload: 'login',
    });
  });

  it('should fetch loginInfo from store', () => {
    const _initialState = {
      ...state,
      auth: {
        login: {
          email: 'zeroFruit@gmail.com',
          password: 'password',
        },
        auth: null,
      },
      user: {
        user: null,
      },
    };
    const { getByLabelText } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      _initialState,
    );

    expect(getByLabelText('email')).toHaveTextContent('zeroFruit@gmail.com');
    expect(getByLabelText('password')).toHaveTextContent('password');
  });

  it('should dispatch changeField action when input value changed', () => {
    const { getByLabelText, store } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      state,
    );
    fireEvent.change(getByLabelText('input-form'), {
      target: {
        value: 'WHOAMI',
      },
    });
    const fetchedActions = store.getActions();
    expect(fetchedActions.length).toBe(2);
    expect(fetchedActions[1]).toStrictEqual({
      type: 'auth/CHANGE_FIELD',
      payload: {
        form: 'login',
        key: 'input-form',
        value: 'WHOAMI',
      },
    });
  });

  it('should show alert window when email is empty', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(message => {
      expect(message).toEqual('Email and Password must not be empty.');
    });
    const _initialState = {
      ...state,
      auth: {
        login: {
          email: 'zeroFruit@gmail.com',
          password: '',
        },
        auth: null,
      },
      user: {
        user: null,
      },
    };
    const { getByText, store } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      _initialState,
    );

    fireEvent.click(getByText('login'));
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  it('should show alert window when password is empty', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(message => {
      expect(message).toEqual('Email and Password must not be empty.');
    });
    const _initialState = {
      ...state,
      auth: {
        login: {
          email: '',
          password: 'password',
        },
        auth: null,
      },
      user: {
        user: null,
      },
    };
    const { getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      _initialState,
    );

    fireEvent.click(getByText('login'));
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  it('should show alert window when email and password is empty', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(message => {
      expect(message).toEqual('Email and Password must not be empty.');
    });
    const { getByText, store } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      state,
    );

    fireEvent.click(getByText('login'));
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch login action when form data is valid', () => {
    const _initialState = {
      ...state,
      auth: {
        login: {
          email: 'zeroFruit@gmail.com',
          password: 'password',
        },
        auth: null,
      },
      user: {
        user: null,
      },
    };
    const { getByText, store } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
      </MemoryRouter>,
      _initialState,
    );

    fireEvent.click(getByText('login'));

    const fetchedActions = store.getActions();
    expect(fetchedActions.length).toBe(2);
    expect(fetchedActions[1]).toStrictEqual({
      type: 'auth/LOGIN',
      payload: {
        email: 'zeroFruit@gmail.com',
        password: 'password',
      },
    });
  });

  it('should redirect to /register when click register button', async () => {
    const MockRegisterPage = () => <div>MockRegisterPage</div>;
    const { getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
        <Route component={MockRegisterPage} path="/register" />
      </MemoryRouter>,
      state,
    );

    fireEvent.click(getByText('register'));

    await waitForElement(() => getByText('MockRegisterPage'));
    expect(getByText('MockRegisterPage')).toHaveTextContent('MockRegisterPage');
  });

  it('should redirect to /request page when auth is not null', async () => {
    const MockRequestPage = () => <div>MockRequestPage</div>;
    const _initialState = {
      ...state,
      auth: {
        ...state.auth,
        auth: {}, // NOT NULL
      },
      user: {
        user: {
          id: 1,
        },
      },
    };
    const { getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginContainer} path="/login" />
        <Route component={MockRequestPage} path="/request" />
      </MemoryRouter>,
      _initialState,
    );

    await waitForElement(() => getByText('MockRequestPage'));
    expect(getByText('MockRequestPage')).toHaveTextContent('MockRequestPage');
  });
});
