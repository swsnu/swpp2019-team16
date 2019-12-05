import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '../../common/Checkbox';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '30px',
  },
  content: {
    marginBottom: '25px',
  },
  map: {
    width: '100%',
    flex: 1,
    marginBottom: '25px',
  },
  noLocationSelected: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
});

MinimumPassengerSection.propTypes = {
  minimumPassengerOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedMinimumPassenger: PropTypes.string,
  onClickMinimumPassenger: PropTypes.func.isRequired,
};

function MinimumPassengerSection({
  minimumPassengerOptions,
  selectedMinimumPassenger,
  onClickMinimumPassenger,
}) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant={'h4'}>How many co-passengers at least?</Typography>
      </div>
      <div className={styles.content}>
        {minimumPassengerOptions &&
          minimumPassengerOptions.map(minimumPassenger => (
            <Checkbox
              key={minimumPassenger}
              name={'minimumPassenger'}
              value={minimumPassenger}
              onClick={() =>
                selectedMinimumPassenger === minimumPassenger
                  ? onClickMinimumPassenger(null)
                  : onClickMinimumPassenger(minimumPassenger)
              }
              checked={minimumPassenger === selectedMinimumPassenger}
            />
          ))}
      </div>
    </div>
  );
}

export default MinimumPassengerSection;
