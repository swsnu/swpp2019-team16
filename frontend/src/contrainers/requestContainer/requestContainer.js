import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Request from '../../components/request/request';
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
  const minimumPassenger = [2, 3, 4];

  const onClickRequest = useCallback(
    payload => {
      dispatch(requestCarpool(payload));
      history.push('/waiting');
    },
    [dispatch, history],
  );

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
