import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../../components/Login';
import {
  login,
  changeField,
  initializeForm,
  authNull,
} from '../../modules/auth';
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

function LoginContainer({ history }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { loginInfo, auth, authError, user } = useSelector(
    ({ auth, user }) => ({
      loginInfo: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      e.preventDefault();
      const { email, password } = loginInfo;
      if (email === '' || password === '') {
        window.alert('Email and Password must not be empty.');
        setLoading(false);
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
    dispatch(authNull());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      window.alert('Email or password is wrong.');
      setLoading(false);
    }
    if (auth) {
      dispatch(check({ id: auth.id }));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      } finally {
        /*
         * if user type is rider redirect to request page
         * otherwise (in the case of driver) redirect to request call page
         * */
        switch (user.user.user_type) {
          case 'rider':
            history.push('/request');
            break;
          case 'driver':
            history.push('/requestcall');
            break;
          default:
            console.error('Invalid user type', user.user.user_type);
        }
      }
    }
  }, [history, user]);

  return (
    <div>
      {loading === true ? (
        <div className={styles.root}>
          <div className={styles.container}>
            <CircularProgress color="secondary" />
          </div>
        </div>
      ) : (
        <Login
          loginInfo={loginInfo}
          onChange={onChange}
          onClickLogin={onClickLogin}
          onClickRegister={onClickRegister}
        />
      )}
    </div>
  );
}
export default withRouter(LoginContainer);
