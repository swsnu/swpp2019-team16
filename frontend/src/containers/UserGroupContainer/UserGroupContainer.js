import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import UserGroup from '../../components/UserGroup/UserGroup';
import { withRouter } from 'react-router-dom';
import { onTaxi } from '../../modules/group/group';

// todo: need to send Google Map API as props
// todo: need to add timer
// todo: need to get data from backend
// current state : group has been formed

function UserGroupContainer() {
  const dispatch = useDispatch();
  const onClickOnTaxi = useCallback(({ id }) => dispatch(onTaxi(id)), [
    dispatch,
  ]);
  const googleMap = {
    map: 'Google Map',
  };
  const driverInfo = {
    Name: 'MockDriver',
    Vehicle: 'BMW',
    Plate: '01A 1234',
  };
  const group = ['Rider1', 'Rider2', 'Rider3', 'Rider4'];
  return (
    <UserGroup
      group={group}
      onClick={onClickOnTaxi}
      googleMap={googleMap}
      driverInfo={driverInfo}
    />
  );
}
export default withRouter(UserGroupContainer);
