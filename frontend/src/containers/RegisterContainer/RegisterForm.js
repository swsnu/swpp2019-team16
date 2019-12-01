import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Register from '../../components/Register/Register';
import { register, changeField, initializeForm } from '../../modules/auth/auth';

function RegisterForm({ history }) {
  const dispatch = useDispatch();
  const { form, auth } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
  }));

  const onChange = useCallback(
    e => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'register',
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );

  const onConfirm = useCallback(() => {
    const { email, password, passwordConfirmation, carType, plateNo } = form;
    let userType = form.userType;
    if (userType === '') {
      userType = 'rider';
    }
    if (!email) {
      window.alert('Email must not be empty.');
    } else if (!password) {
      window.alert('Password must not be empty.');
    } else if (password !== passwordConfirmation) {
      window.alert('Password confirm does not match password.');
    } else if (userType === 'driver' && (carType === '' || plateNo === '')) {
      window.alert('Driver Info must not be empty.');
    } else {
      dispatch(
        register({
          userType,
          email,
          password,
          carType,
          plateNo,
        }),
      );
    }
  }, [dispatch, form]);

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      window.alert('Successfully signed up to Ya-Ta. Welcome!');
      history.push('/login');
    }
  }, [auth, history]);

  return <Register form={form} onChange={onChange} onClick={onConfirm} />;
}

export default withRouter(RegisterForm);
