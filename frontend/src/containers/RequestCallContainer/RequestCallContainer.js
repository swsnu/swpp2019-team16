import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as grpcClient from '../../lib/grpc/client';
import { groupCreated, acceptGroup, groupUpdated } from '../../modules/group';
import { withRouter } from 'react-router-dom';
import RequestCallSection from '../../components/RequestCall/RequestCallSection';
import { GROUP_CREATED_EVENT, GROUP_UPDATED_EVENT } from '../../types/event';

RequestCallContainer.propTypes = {};

function RequestCallContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group, onDriving } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
    onDriving: group.onDriving,
  }));

  useEffect(() => {
    if (user) {
      // TODO: fix test case
      const stream = grpcClient.createGrpcStream({ id: user.user.id });
      stream.on('data', message => {
        const parsed = JSON.parse(message.getData());
        if (parsed._type_name === GROUP_CREATED_EVENT) {
          dispatch(
            groupCreated({
              groupId: parsed._group_id,
              from: parsed._from_location,
              to: parsed._to_location,
            }),
          );
        }

        if (parsed._type_name === GROUP_UPDATED_EVENT) {
          dispatch(
            groupUpdated({
              groupId: parsed._group_id,
              driver: parsed._driver,
              riders: parsed._rider_list,
              fromLocation: parsed._from_location,
              toLocation: parsed._to_location,
            }),
          );
          // After group dispatch, redirect to group page
          history.push('/group');
        }
      });

      return () => {
        stream.cancel();
      };
    }
  }, [dispatch, user]);

  const onClickRequestCall = useCallback(
    ({ groupId, driverId }) => {
      dispatch(acceptGroup({ groupId, driverId }));
    },
    [dispatch, history],
  );

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  return (
    <RequestCallSection
      user={user}
      group={group}
      onClickRequestCall={onClickRequestCall}
    />
  );
}

export default withRouter(RequestCallContainer);
