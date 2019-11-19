import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignUp from '../../components/SignUp/SignUp';
import { register, changeField, initalizeForm } from '../../modules/auth/auth';

function SignUpForm({ history }) {
  const dispatch = useDispatch();
  const form = useSelector(({ auth }) => ({
    form: auth.register,
  }));
  var passwordConfirm = null;

  useEffect(() => {
    dispatch(initalizeForm('register'));
  }, [dispatch]);

  const onChange = useCallback(
    e => {
      const { value, name } = e.target;
      if (e.target.name === 'passwordConfirmation') {
        passwordConfirm = e.target.value;
      } else {
        dispatch(
          changeField({
            form: 'register',
            key: name,
            value,
          }),
        );
      }
    },
    [dispatch],
  );

  const onConfirm = useCallback(() => {
    const { email, password, vehicleInfo } = form;
    console.log(form);

    if (!email) {
      window.alert('Email must not be empty.');
    } else if (!password) {
      window.alert('Password must not be empty.');
    } else if (password !== passwordConfirm) {
      window.alert('Password confirm does not match password.');
    } else {
      dispatch(register({ email, password, vehicleInfo }));
      history.push('/request');
    }
  }, [dispatch, form, history]);

  return <SignUp form={form} onChange={onChange} onClick={onConfirm} />;
}

export default withRouter(SignUpForm);
