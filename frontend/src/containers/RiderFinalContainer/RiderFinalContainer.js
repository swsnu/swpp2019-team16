import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RiderFinal from '../../components/RiderFinal/RiderFinal';

RiderFinalContainer.propTypes = {};

function RiderFinalContainer({ history }) {
  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  console.log('RiderFinalContainer', group);

  const onClickGoToMain = useCallback(() => {
    history.push('/request');
  }, [history]);

  if (!user) {
    return <div>we are loading user...</div>;
  }

  return <RiderFinal group={group} onClickGoToMain={onClickGoToMain} />;
}

export default withRouter(RiderFinalContainer);
