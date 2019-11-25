import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import Login from 'components/Login';
import { useDispatch } from 'react-redux';
import { login } from '../../modules/auth';

function LoginContainer({ history }) {
  const dispatch = useDispatch();

  const onLoginRequest = useCallback(
    ({ id, password }) => {
      dispatch(login({ id, password }));
    },
    [dispatch],
  );

  const onRegisterRequest = useCallback(() => {
    history.push('/signup'); //change to registerpage
  }, [history]);

  return (
    <Login
      onLoginRequest={onLoginRequest}
      onRegisterRequest={onRegisterRequest}
    />
  );
}
export default withRouter(LoginContainer);
