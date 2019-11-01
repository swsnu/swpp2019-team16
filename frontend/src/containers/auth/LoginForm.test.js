import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import {renderWithRedux} from "../../test/utils";
import {MemoryRouter, Route} from "react-router-dom";

jest.mock('../../components/auth/AuthForm', () => jest.fn(
  props => (
    <div>
      <input onChange={props.onChange}/>
      <button onClick={props.onSubmit}>Submit</button>
    </div>
  )
))

describe('<LoginForm />', () => {
  const state = {
    auth: {
      login: {
        username: '',
        password: '',
      },
      auth: null,
      authError: null,
    },
    user: {
      user: null,
    }
  };
  it('SHOULD match with snapshot', async () => {
    const { container } = renderWithRedux(
      <MemoryRouter initialEntries={['/login']}>
        <Route component={LoginForm} path='/login' />
      </MemoryRouter>,
      state
    );

    expect(container).toMatchSnapshot();
  });
});