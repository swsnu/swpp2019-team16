import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initalizeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import {withRouter} from 'react-router-dom';

LoginForm.propTypes = {};

function LoginForm({ history }) {

  const dispatch = useDispatch();

  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initalizeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      alert('Email or password is wrong');
      return;
    }

    if (auth) {
      dispatch(check());
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
    <AuthForm
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(LoginForm);