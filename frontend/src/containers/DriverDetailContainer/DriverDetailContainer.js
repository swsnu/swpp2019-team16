import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmCost, initCostConfirmed } from '../../modules/group';
import { withRouter } from 'react-router-dom';
import DriverDetail from '../../components/DriverDetail';
import { initPointUpdatedFlag, updatePoint } from '../../modules/user';

DriverDetailContainer.propTypes = {};

function DriverDetailContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group, pointUpdated, costConfirmed } = useSelector(
    ({ user, group }) => ({
      user: user.user,
      pointUpdated: user.pointUpdated,
      costConfirmed: group.costConfirmed,
      group: group.group,
    }),
  );

  const onClickConfirm = useCallback(
    ({ userId, groupId, totalCost }) => {
      console.log('user2222', user);
      const point = user.user.point + Math.floor(totalCost * 1.2 * 0.01) * 100;
      console.log('DriverDetailContainer', point);
      dispatch(confirmCost({ groupId, totalCost }));
      dispatch(updatePoint({ userId, point }));
    },
    [dispatch, user, history],
  );

  useEffect(() => {
    if (pointUpdated && costConfirmed) {
      history.push('/driverfinal');
    }
  }, [pointUpdated, costConfirmed]);

  useEffect(() => {
    return () => {
      dispatch(initPointUpdatedFlag());
      dispatch(initCostConfirmed());
    };
  }, [dispatch]);

  if (!user) {
    return <div>we are loading user...</div>;
  }

  if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }

  return (
    <DriverDetail user={user} group={group} onClickConfirm={onClickConfirm} />
  );
}

export default withRouter(DriverDetailContainer);
