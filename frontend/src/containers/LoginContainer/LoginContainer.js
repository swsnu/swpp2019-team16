import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../../components/Login';
import { login, changeField, initializeForm } from '../../modules/auth';
import { check } from '../../modules/user/user';

function LoginContainer({ history }) {
  const dispatch = useDispatch();
  const { loginInfo, auth, authError, user } = useSelector(
    ({ auth, user }) => ({
      loginInfo: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );

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

  const onClickLogin = useCallback(
    e => {
      e.preventDefault();
      const { email, password } = loginInfo;
      if (email === '' || password === '') {
        window.alert('Email and Password must not be empty.');
      } else {
        dispatch(login({ email, password }));
      }
    },
    [dispatch, loginInfo],
  );

  const onClickRegister = useCallback(() => {
    history.push('/register');
  }, [history]);

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      alert('Email or password is wrong.');
      return;
    }

    if (auth) {
      dispatch(check({ id: auth.id }));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/request');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

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
