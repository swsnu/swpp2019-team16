import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';

function HeaderContainer({ history }) {
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));

  const onClickLogo = useCallback(() => {
    if (auth === null) {
      history.push('/intro');
    } else {
      history.push('/request');
    }
  }, [auth, history]);

  const onClickLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  return (
    <Header
      auth={auth}
      onClickLogo={onClickLogo}
      onClickLogin={onClickLogin}
      onClickLogout={() => {}}
      onClickPoint={() => {}}
    />
  );
}
export default withRouter(HeaderContainer);
