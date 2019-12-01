import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../../components/Login/Login';
import { login, changeField, initializeForm } from '../../modules/auth/auth';

function LoginContainer({ history }) {
  const dispatch = useDispatch();
  const { loginInfo, auth } = useSelector(({ auth }) => ({
    loginInfo: auth.login,
    auth: auth.auth,
  }));

  const onChange = useCallback(
    e => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'login',
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );

  const onClickLogin = useCallback(() => {
    const { email, password } = loginInfo;
    if (email === '' || password === '') {
      window.alert('Email and Password must not be empty.');
    } else {
      dispatch(login({ email, password }));
    }
  }, [dispatch, loginInfo]);

  const onClickRegister = useCallback(() => {
    history.push('/register');
  }, [history]);

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      history.push('/request');
    }
  });

  return (
    <Login
      loginInfo={loginInfo}
      onChange={onChange}
      onClickLogin={onClickLogin}
      onClickRegister={onClickRegister}
    />
  );
}
export default withRouter(LoginContainer);
