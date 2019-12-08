import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmCost } from '../../modules/group';
import { withRouter } from 'react-router-dom';
import DriverDetail from '../../components/DriverDetail'
import { updatePoint } from 'lib/api/user/user';

DriverDetailContainer.propTypes = {};

function DriverDetailContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  const onClickConfirm = useCallback(
    ({ userId, groupId, totalCost }) => {
      console.log(groupId, totalCost)
      var premium_cost = Math.floor(totalCost * 1.2 * 0.01) * 100;
      dispatch(confirmCost({groupId, totalCost}));
      dispatch(updatePoint({userId, premium_cost}));
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
      userId={user.id}
      groupId={group.groupId}
      onClickConfirm={onClickConfirm}
    />
  );
}

export default withRouter(DriverDetailContainer);
