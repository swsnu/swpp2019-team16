import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as grpcClient from '../../lib/grpc/client';
import { groupCreated, unloadGroup, acceptGroup } from '../../modules/group';
import { withRouter } from 'react-router-dom';
import RequestCallSection from '../../components/RequestCall/RequestCallSection';

RequestCallContainer.propTypes = {};

export const GROUP_CREATED_EVENT = 'event.group_created';

function RequestCallContainer({ history }) {
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
        if (parsed._type_name !== GROUP_CREATED_EVENT) {
          return;
        }
        dispatch(
          groupCreated({
            groupId: parsed._group_id,
            from: parsed._from_location,
            to: parsed._to_location,
          }),
        );
      });

      return () => {
        dispatch(unloadGroup());
        stream.cancel();
      };
    }
  }, [dispatch, user]);

  const onClickRequestCall = useCallback(
    ({ groupId, driverId }) => {
      dispatch(acceptGroup({ groupId, driverId }));

      // TODO: when group successfully updated, then redirect
      history.push('/group');
    },
    [dispatch, history],
  );

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }

  return (
    <RequestCallSection
      user={user}
      group={group}
      onClickRequestCall={onClickRequestCall}
    />
  );
}

export default withRouter(RequestCallContainer);
