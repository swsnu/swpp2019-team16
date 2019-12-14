import React from 'react';
import { UserPropsTypes } from '../../../types/user';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  email: {
    marginTop: '0.7rem',
    marginBottom: '0.7rem',
  },
  carInfo: {
    marginTop: '0.7rem',
  }
});

DriverInfo.propTypes = {
  driver: UserPropsTypes.isRequired
};

function DriverInfo({ driver }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Typography variant={'h4'}>
        Your driver email is
      </Typography>
      <div className={styles.email}>
        <Typography variant={'h3'}>
          {driver.user.email}
        </Typography>
      </div>
      <Typography variant={'h4'}>
        with
      </Typography>
      <div className={styles.carInfo}>
        <Typography variant={'h3'}>
          {driver.user.vehicle.car_type}, {driver.user.vehicle.plate_no}
        </Typography>
      </div>
    </div>
  )
}

export default DriverInfo;