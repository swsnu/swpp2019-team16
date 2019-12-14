import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import { logout } from '../../../modules/user/user';
import { authNull } from '../../../modules/auth/auth';

function HeaderContainer({ history }) {
  const dispatch = useDispatch();
  const { user, auth } = useSelector(({ user, auth }) => ({
    user: user.user,
    auth: auth.auth,
  }));

  const onClickLogo = useCallback(() => {
    if (user === null) {
      history.push('/');
    } else {
      history.push('/request');
    }
  }, [user, history]);

  const onClickLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const onClickLogout = useCallback(() => {
    dispatch(logout());
    dispatch(authNull());

    alert('Successfully logged out.');
    history.push('/');
  }, [dispatch, history]);

  return (
    <Header
      user={user}
      auth={auth}
      onClickLogo={onClickLogo}
      onClickLogin={onClickLogin}
      onClickLogout={onClickLogout}
      onClickPoint={() => {}}
    />
  );
}
export default withRouter(HeaderContainer);
