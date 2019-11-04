import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Request from '../../components/Request';
import { withRouter } from 'react-router-dom';
import { requestCarpool } from '../../modules/carpoolRequest';

RequestContainer.propTypes = {};

function RequestContainer({ history }) {
  const dispatch = useDispatch();
  const user = useSelector(user => ({
    user: user.user,
  }));

  //TODO: it should be loaded from DB
  const fromList = ['SNU station', 'Nakseongdae station', 'Nokdu Street'];
  const toList = ['301 building', 'Student Center', 'Dormitory three-way'];
  const minimumPassenger = ['2', '3', '4'];

  const onClickRequest = useCallback(
    ({ userId, from, toString, minimumPassenger }) => {
      dispatch(requestCarpool({ userId, from, toString, minimumPassenger }));
      history.push('/waiting');
    },
    [dispatch, history],
  );

  if (!user) {
    return <div>we are loading user...</div>;
  }

  return (
    <Request
      user={user}
      fromList={fromList}
      toList={toList}
      minimumPassenger={minimumPassenger}
      onClickRequest={onClickRequest}
    />
  );
}

export default withRouter(RequestContainer);
