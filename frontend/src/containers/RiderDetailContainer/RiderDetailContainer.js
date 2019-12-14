import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as grpcClient from '../../lib/grpc/client';
import { groupCostUpdated, unloadGroup } from '../../modules/group';
import { updatePoint } from '../../modules/user';
import { withRouter } from 'react-router-dom';
import RiderDetail from '../../components/RiderDetail/RiderDetail';

RiderDetailContainer.propTypes = {};

export const GROUP_COST_UPDATED_EVENT = 'event.group_cost_updated';

function RiderDetailContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  useEffect(() => {
    if (user) {
      // TODO: fix test case
      const stream = grpcClient.createGrpcStream({ id: user.user.id });
      stream.on('data', message => {
        const parsed = JSON.parse(message.getData());
        if (parsed._type_name !== GROUP_COST_UPDATED_EVENT) {
          return;
        }
        dispatch(
          groupCostUpdated({
            groupId: parsed._group_id,
            totalCost: parsed._total_cost,
            riderCost: parsed._rider_cost,
          }),
        );
        dispatch(
          updatePoint({
            userId: user.user.id,
            point: user.point - parsed._rider_cost,
          }),
        );
        history.push('/riderfinal');
      });

      return () => {
        dispatch(unloadGroup());
        stream.cancel();
      };
    }
  }, [dispatch, user, history]);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }

  return <RiderDetail group={group} />;
}

export default withRouter(RiderDetailContainer);
