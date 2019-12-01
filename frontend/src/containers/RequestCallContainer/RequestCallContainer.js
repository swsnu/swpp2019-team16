import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as grpcClient from '../../lib/grpc/client';
import { groupCreated, unloadGroup, acceptGroup } from '../../modules/group';
import { withRouter } from 'react-router-dom';
import RequestCallSection from '../../components/RequestCall/RequestCallSection'


RequestCallContainer.propTypes = {};

export const GROUP_CREATED_EVENT = 'event.group_created';

function RequestCallContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  useEffect(() => {
    const stream = grpcClient.createGrpcStream({ id: 11/*user.id*/ });
    stream.on('data', message => {
      const parsed = JSON.parse(message.getData());
      //console.log(parsed);
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
  }, [dispatch]);

  const onClickRequestCall = useCallback(
    ({groupId, driverId}) => {
      dispatch(acceptGroup({groupId, driverId}));
      history.push('/group');
    }, [dispatch, history],
    );
/*
  if (!user) {
    return <div>we are loading user...</div>;
  }

  else if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }
  
  else {
    return (
      <RequestCallSection
        driverId={user.driverId}
        groupId={group.groupId}
        onClickRequestCall={onClickRequestCall}
      />
    );
  }

*/  
  
  // for test
 return (
  <RequestCallSection
    driverId={6}
    groupId={10}
    onClickRequestCall={onClickRequestCall}
  />
  );

}

export default withRouter(RequestCallContainer);
