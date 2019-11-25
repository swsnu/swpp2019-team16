import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RequestCallSection from '../../components/RequestCall/RequestCallSection';
import { withRouter } from 'react-router-dom';
import { acceptGroup, groupPushed, unloadGroup } from '../../modules/group';

RequestCallContainer.propTypes = {};

function RequestCallContainer({ history }) {  
  const dispatch = useDispatch();

  const { user, group } = useSelector(({user, group}) => ({
    user: user.user,
    group: group.group
  }));

  const onClickRequestCall = useCallback(
    ({groupId, driverId}) => { 
      dispatch(acceptGroup({groupId, driverId}));
      history.push('/group');
    }, [dispatch, history],
  );
/*
  useEffect(() => {
    const stream = createGrpcStream();
    stream.on('data', message => {
      const parsed = JSON.parse(message.getData());
      console.log('parsed', parsed);
      if (parsed._type_name === 'event.group_pushed') {
        dispatch(
          groupPushed({
            groupId: parsed._group_id
            //from: parsed._from_location,
            //to: parsed._to_location,
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
*/
/*  
  if (!user) {
    return <div>we are loading user...</div>;
  }

  if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }
  */
  return (
    <RequestCallSection
      user={user}
      group={group}
      onClickRequestCall={onClickRequestCall}
    />
  );
}

export default withRouter(RequestCallContainer);
