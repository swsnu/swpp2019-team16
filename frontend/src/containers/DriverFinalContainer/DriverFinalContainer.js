import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DriverFinal from '../../components/DriverFinal/DriverFinal';
import { unloadGroup } from '../../modules/group';

DriverFinalContainer.propTypes = {};

function DriverFinalContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  useEffect(() => {
    return () => dispatch(unloadGroup());
  }, [dispatch]);

  const onClickGoToMain = useCallback(() => {
    history.push('/requestcall');
  }, [history]);

  if (!user) {
    return <div>we are loading user...</div>;
  }

  return (
    <DriverFinal user={user} group={group} onClickGoToMain={onClickGoToMain} />
  );
}

export default withRouter(DriverFinalContainer);
