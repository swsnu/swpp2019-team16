import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DriverFinal from '../../components/DriverFinal/DriverFinal';

DriverFinalContainer.propTypes = {};

function DriverFinalContainer({ history }) {
  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  const onClickGoToMain = useCallback(() => {
    history.push('/requestcall');
  }, [history]);

  if (!user) {
    return <div>we are loading user...</div>;
  }

  if (!group) {
    return <div>There is no group...</div>;
  }

  return (
    <DriverFinal user={user} group={group} onClickGoToMain={onClickGoToMain} />
  );
}

export default withRouter(DriverFinalContainer);
