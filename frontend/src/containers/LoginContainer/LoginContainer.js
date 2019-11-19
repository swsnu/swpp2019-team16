import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import Login from 'components/Login';
import { useSelector, useDispatch } from 'react-redux';
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
    history.push('/intro'); //change to registerpage
  }, [history]);

  return (
    <Login
      onLoginRequest={onLoginRequest}
      onRegisterRequest={onRegisterRequest}
    />
  );
}
export default withRouter(LoginContainer);
