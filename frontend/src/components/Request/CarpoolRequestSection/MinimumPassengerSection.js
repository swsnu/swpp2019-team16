import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '../../common/Checkbox';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {},
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
      <h2>Minimum Passenger</h2>
      {
        minimumPassengerOptions &&
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
        ))
      }
    </div>
  );
};

export default MinimumPassengerSection;