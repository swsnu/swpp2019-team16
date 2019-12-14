import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Register from '../../components/Register/Register';
import { register, changeField, initializeForm } from '../../modules/auth/auth';
import { check } from '../../modules/user/user';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import theme from '../../lib/styles/theme';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function RegisterForm({ history }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      dispatch(check({ id: auth.id }));
    }
    if (authError) {
      console.log(authError);
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      window.alert('Successfully signed up to Ya-Ta. Welcome!');
      history.push('/login');
    }
  }, [auth, user, history]);

  return (
    <div>
      {loading === true ? (
        <div className={styles.root}>
          <div className={styles.container}>
            <CircularProgress color="secondary" />
          </div>
        </div>
      ) : (
        <Register form={form} onChange={onChange} onClick={onConfirm} />
      )}
    </div>
  );
}

export default withRouter(RegisterForm);
