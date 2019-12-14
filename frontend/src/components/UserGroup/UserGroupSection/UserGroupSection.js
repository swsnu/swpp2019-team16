import React, { useState } from 'react';
import Timer from 'react-compound-timer';
import PropTypes from 'prop-types';
import { GroupPropTypes } from '../../../types/group';
import { makeStyles } from '@material-ui/styles';
import Map from '../../common/Map';
import MapPin from '../../common/MapPin';
import RiderList from '../RiderList';
import DriverInfo from '../DriverInfo';
import Button from '../../common/Button';
import { UserPropsTypes } from '../../../types/user';
import { Typography } from '@material-ui/core';

const INITIAL_TIME_LEFT = 10000;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  map: {
    marginBottom: '2rem',
  },
  location: {
    marginTop: '2rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '2rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  locationTitle: {
    marginBottom: '0.7rem',
  },
  locationTo: {
    marginTop: '0.7rem',
    marginBottom: '0.7rem',
  },
  timer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  driver: {
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  riderList: {
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

UserGroupSection.propTypes = {
  user: UserPropsTypes.isRequired,
  group: GroupPropTypes.isRequired,
  onTaxiRidersList: PropTypes.arrayOf(
    PropTypes.shape({
      riderId: PropTypes.number,
    }),
  ),
  onClickOnTaxi: PropTypes.func.isRequired,
  onClickGoTaxi: PropTypes.func.isRequired,
};

// TODO: dynamic map pin
function UserGroupSection({
  user,
  group,
  onTaxiRidersList,
  onClickOnTaxi = () => {},
  onClickGoTaxi = () => {},
}) {
  const [onTaxied, setOnTaxied] = useState(false);
  const [timeover, setTimeover] = useState(false);
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.map}>
        <Map
          zoom={15}
          center={{
            lat: 37.480126,
            lng: 126.952436,
          }}
          width={'100%'}
          height={'400px'}
        >
          <MapPin lat={37.480126} lng={126.952436} />
          <MapPin lat={37.477023} lng={126.961957} />
        </Map>
      </div>
      <div className={styles.location}>
        <div className={styles.locationTitle}>
          <Typography variant={'h4'}>We are going from</Typography>
        </div>
        <Typography variant={'h2'}>
          {group.from} ~ {group.to}
        </Typography>
      </div>
      <div className={styles.driver}>
        <DriverInfo driver={group.driver} />
      </div>
      <div className={styles.riderList}>
        <RiderList riders={group.riders} onTaxiRidersList={onTaxiRidersList} />
      </div>
      <div className={styles.timer}>
        <Timer
          initialTime={INITIAL_TIME_LEFT}
          direction="backward"
          checkpoints={[
            {
              time: 0,
              callback: () => {
                console.log('timeover!');
                setTimeover(true);
              },
            },
          ]}
        >
          {() => (
            <Typography variant={'h3'}>
              <Timer.Seconds /> seconds left, before taxi leave
            </Typography>
          )}
        </Timer>
      </div>
      <div className={styles.footer}>
        {user.user.user_type === 'rider' ? (
          <Button
            onClick={() => {
              setOnTaxied(true);
              onClickOnTaxi();
            }}
            disabled={onTaxied}
          >
            <Typography variant={'body1'}>On Taxi</Typography>
          </Button>
        ) : (
          <Button onClick={onClickGoTaxi} disabled={!timeover}>
            <Typography variant={'body1'}>Go</Typography>
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserGroupSection;
