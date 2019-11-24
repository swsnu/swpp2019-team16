import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '../../common/Checkbox';
import { Typography } from '@material-ui/core';
import Map from '../../common/Map';
import MapPin from '../../common/MapPin';
import { LocationPropTypes } from '../../../types/location';

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

FromSection.propTypes = {
  fromList: PropTypes.arrayOf(LocationPropTypes).isRequired,
  selectedFrom: LocationPropTypes,
  onClickFrom: PropTypes.func.isRequired,
};

function FromSection({ fromList, selectedFrom, onClickFrom }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant={'h2'}>Where are you?</Typography>
      </div>
      <div className={styles.content}>
        {fromList &&
          fromList.map(location => (
            <Checkbox
              key={location.name}
              name={'from'}
              value={location.name}
              onClick={() =>
                selectedFrom === location.name
                  ? onClickFrom(null)
                  : onClickFrom(location)
              }
              checked={
                selectedFrom !== null && selectedFrom.name === location.name
              }
            />
          ))}
      </div>
      <div className={styles.map}>
        {selectedFrom === null ? (
          <div className={styles.noLocationSelected}>
            <Typography variant={'h5'}>No location selected.</Typography>
          </div>
        ) : (
          <div>
            <Map
              center={{
                lat: selectedFrom.coordinate.lat,
                lng: selectedFrom.coordinate.lng,
              }}
              width={'100%'}
              height={'400px'}
            >
              <MapPin
                lat={selectedFrom.coordinate.lat}
                lng={selectedFrom.coordinate.lng}
              />
            </Map>
          </div>
        )}
      </div>
    </div>
  );
}

export default FromSection;
