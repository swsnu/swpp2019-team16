import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import CarpoolRequestSection from '../../../components/Request/CarpoolRequestSection';
import { withRouter } from 'react-router-dom';
import { requestCarpool } from '../../../modules/carpoolRequest';
import { fromLocationList, toLocationList } from '../../../types/location';

const MINIMUM_PASSENGER_LIST = ['2', '3', '4'];

CarpoolRequestSectionContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

// TODO: add carpool request create error handling
function CarpoolRequestSectionContainer({ history }) {
  const dispatch = useDispatch();

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onClickRequest = useCallback(
    ({ riderId, from, to, minimumPassenger }) => {
      dispatch(requestCarpool({ riderId, from, to, minimumPassenger }));
      history.push('/waiting');
    },
    [dispatch, history],
  );

  // TODO: add test case
  useEffect(() => {
    if (!user) {
      console.log('User not exist, should login first!');
      history.push('/login');
    }
  }, [history, user]);

  return (
    <CarpoolRequestSection
      user={user}
      fromLocationList={fromLocationList}
      toLocationList={toLocationList}
      minimumPassengerList={MINIMUM_PASSENGER_LIST}
      onCarpoolRequest={onClickRequest}
    />
  );
}

export default withRouter(CarpoolRequestSectionContainer);
