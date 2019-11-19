import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createGrpcStream from '../../lib/grpc/client';
import { withRouter } from 'react-router-dom';
import { groupCreated, unloadGroup } from '../../modules/group';

function WaitingContainer({ history }) {
  const dispatch = useDispatch();

  const { group } = useSelector(({ group }) => ({
    group: group.group,
  }));

  useEffect(() => {
    const stream = createGrpcStream();
    stream.on('data', message => {
      const parsed = JSON.parse(message.getData());
      console.log('parsed', parsed);
      if (parsed._type_name === 'event.group_created') {
        dispatch(
          groupCreated({
            from: parsed._from_location,
            to: parsed._to_location,
          }),
        );
      }
    });
    stream.on('status', status => {
      console.log('status', status);
    });
    stream.on('end', end => {
      console.log('end', end);
    });

    return () => {
      dispatch(unloadGroup());
      stream.cancel();
    };
  }, [dispatch, history]);

  useEffect(() => {
    if (group) {
      history.push('/group');
    }
  }, [group, history]);

  return <div>Waiting for group to be matched</div>;
}

export default withRouter(WaitingContainer);
