import React, { useCallback } from 'react';
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

function CarpoolRequestSectionContainer({ history }) {
  const dispatch = useDispatch();

  const user = useSelector(user => ({
    user: user.user,
  }));

  const onClickRequest = useCallback(
    ({ riderId, from, to, minimumPassenger }) => {
      dispatch(requestCarpool({ riderId, from, to, minimumPassenger }));
      history.push('/waiting');
    },
    [dispatch, history],
  );

  if (!user) {
    return <div>we are loading user...</div>;
  }

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
