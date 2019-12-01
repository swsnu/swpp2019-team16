import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as grpcClient from '../../lib/grpc/client';
import { groupPushed, unloadGroup } from '../../modules/group';
import { withRouter } from 'react-router-dom';
import acceptGroup from '../../modules/group/group'
import RequestCallSection from '../../components/RequestCall/RequestCallSection'


RequestCallContainer.propTypes = {};

export const GROUP_PUSHED_EVENT = 'event.group_pushed';

function RequestCallContainer({ history }) {
  const dispatch = useDispatch();

  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  useEffect(() => {
    const stream = grpcClient.createGrpcStream({ id: 3/*user.userId*/ });
    stream.on('data', message => {
      const parsed = JSON.parse(message.getData());
      if (parsed._type_name !== GROUP_PUSHED_EVENT) {
        return;
      }
      dispatch(
        groupPushed({
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
    }, [dispatch, history]);
  
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
    driverId={1}
    groupId={1}
    onClickRequestCall={onClickRequestCall}
  />
  );

}

export default withRouter(RequestCallContainer);
