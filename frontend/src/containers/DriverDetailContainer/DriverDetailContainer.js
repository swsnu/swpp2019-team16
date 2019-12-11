import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmCost } from '../../modules/group';
import { withRouter } from 'react-router-dom';
import DriverDetail from '../../components/DriverDetail'
import { updatePoint } from '../../modules/user';

DriverDetailContainer.propTypes = {};

function DriverDetailContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  const onClickConfirm = useCallback(
    ({ userId, groupId, totalCost }) => {
      var point = user.point + Math.floor(totalCost * 1.2 * 0.01) * 100;
      dispatch(confirmCost({groupId, totalCost}));
      dispatch(updatePoint({userId, point}));
      history.push('/driverfinal');
    }, [dispatch, history],
  );

  if (!user) {
    return <div>we are loading user...</div>;
  }

  if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }
  
  return (
    <DriverDetail
      user={user}
      group={group}
      onClickConfirm={onClickConfirm}
    />
  );
}

export default withRouter(DriverDetailContainer);
