import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as grpcClient from '../../lib/grpc/client';
import { groupCreated, unloadGroup } from '../../modules/group';
import { withRouter } from 'react-router-dom';

RequestCallContainer.propTypes = {};

export const USER_CREATED_EVENT = 'event.group_created';

function RequestCallContainer({ history }) {
  const dispatch = useDispatch();

  const { group } = useSelector(({ group }) => ({
    group: group.group,
  }));

  useEffect(() => {
    // TODO: replace id with user id
    const stream = grpcClient.createGrpcStream({ id: 3 });
    stream.on('data', message => {
      const parsed = JSON.parse(message.getData());
      if (parsed._type_name !== USER_CREATED_EVENT) {
        return;
      }
      dispatch(
        groupCreated({
          from: parsed._from_location,
          to: parsed._to_location,
        }),
      );
    });

    return () => {
      dispatch(unloadGroup());
      stream.cancel();
    };
  }, [dispatch]);

  useEffect(() => {
    if (group) {
      history.push('/group');
    }
  }, [history, group]);

  // TODO: extract view part to component
  return <div>Waiting for group to be matched...</div>;
}

export default withRouter(RequestCallContainer);
