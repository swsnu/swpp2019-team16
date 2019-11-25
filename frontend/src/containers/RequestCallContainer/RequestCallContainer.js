import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RequestCallSection from '../../components/RequestCall/RequestCallSection';
import { withRouter } from 'react-router-dom';
import { acceptGroup } from '../../modules/group';

RequestCallContainer.propTypes = {};

function RequestCallContainer({ history }) {  
  const dispatch = useDispatch();

  const user = useSelector(user => ({
    user: user.user,
  }));

  const { group } = useSelector(({ group }) => ({
    group: group.group,
  }));
  
  const groupId = 1;
  const driverId = 1;

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

  if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }
  */
  return (
    <RequestCallSection
      user={user}
      onClickRequestCall={onClickRequestCall}
    />
  );
}

export default withRouter(RequestCallContainer);
