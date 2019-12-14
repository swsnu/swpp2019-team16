import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserGroupSection from '../../../components/UserGroup/UserGroupSection';
import { withRouter, useHistory } from 'react-router-dom';
import * as grpcClient from '../../../lib/grpc/client';
import {
  DRIVER_GO_TAXI_EVENT,
  RIDER_ON_TAXI_EVENT,
} from '../../../types/event';
import {
  taxiGone,
  goTaxi,
  riderOnTaxi,
  someoneOnTaxi,
} from '../../../modules/user';

function UserGroupContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, group, onTaxiRidersList, driverGoTaxi } = useSelector(
    ({ user, group }) => ({
      user: user.user,
      group: group.group,
      onTaxiRidersList: user.onTaxiRidersList,
      driverGoTaxi: user.driverGoTaxi,
    }),
  );

  useEffect(() => {
    if (user) {
      const stream = grpcClient.createGrpcStream({ id: user.user.id });
      stream.on('data', message => {
        const parsed = JSON.parse(message.getData());
        if (parsed._type_name === RIDER_ON_TAXI_EVENT) {
          dispatch(
            someoneOnTaxi({
              riderId: parsed._rider.id,
            }),
          );
        }

        if (parsed._type_name === DRIVER_GO_TAXI_EVENT) {
          dispatch(taxiGone());
        }
      });
      return () => {
        stream.cancel();
      };
    }
  }, [user]);

  useEffect(() => {
    if (driverGoTaxi) {
      if (user.user.user_type === 'rider') {
        history.push('/riderdetail');
      } else {
        history.push('/driverdetail');
      }
    }
  }, [driverGoTaxi, user]);

  const onClickOnTaxi = useCallback(() => {
    dispatch(riderOnTaxi({ riderId: user.id }));
  }, [dispatch, user]);

  const onClickGoTaxi = useCallback(() => {
    dispatch(goTaxi({ driverId: user.id }));
  }, [dispatch, user]);

  if (!group) {
    return <div>We are loading your group...</div>;
  }

  return (
    <UserGroupSection
      user={user}
      group={group}
      onTaxiRidersList={onTaxiRidersList}
      onClickOnTaxi={onClickOnTaxi}
      onClickGoTaxi={onClickGoTaxi}
    />
  );
}
export default withRouter(UserGroupContainer);
