import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import WaitingSection from '../../components/Waiting/WaitingSection';
import * as grpcClient from '../../lib/grpc/client';
import { GROUP_DRIVER_UPDATED_EVENT } from '../../types/event';
import { groupUpdated } from '../../modules/group';
import { useDispatch, useSelector } from 'react-redux';

function WaitingContainer() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, group } = useSelector(({ user, group }) => ({
    user: user.user,
    group: group.group,
  }));

  useEffect(() => {
    if (user) {
      const stream = grpcClient.createGrpcStream({ id: user.user.id });
      stream.on('data', message => {
        const parsed = JSON.parse(message.getData());
        console.log('WaitingContainer', parsed);
        if (parsed._type_name !== GROUP_DRIVER_UPDATED_EVENT) {
          return;
        }
        dispatch(
          groupUpdated({
            groupId: parsed._group_id,
            driver: parsed._driver,
            riders: parsed._rider_list,
            fromLocation: parsed._from_location,
            toLocation: parsed._to_location,
          }),
        );
      });
      return () => {
        stream.cancel();
      };
    }
  });

  useEffect(() => {
    if (group) {
      console.log('group', group);
      history.push('/group');
    }
  }, [group]);

  return <WaitingSection />;
}

export default withRouter(WaitingContainer);
