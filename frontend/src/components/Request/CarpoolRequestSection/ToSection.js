import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '../../common/Checkbox';
import PropTypes from 'prop-types';
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

ToSection.propsTypes = {
  toList: PropTypes.arrayOf(LocationPropTypes).isRequired,
  selectedTo: LocationPropTypes,
  onClickTo: PropTypes.func.isRequired,
};

function ToSection({ toList, selectedTo, onClickTo }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant={'h2'}>Where do you want to go?</Typography>
      </div>
      <div className={styles.content}>
        {toList &&
          toList.map(location => (
            <Checkbox
              color={'secondary'}
              key={location.name}
              name={'from'}
              value={location.name}
              onClick={() =>
                selectedTo === location.name
                  ? onClickTo(null)
                  : onClickTo(location)
              }
              checked={selectedTo !== null && selectedTo.name === location.name}
            />
          ))}
      </div>
      <div className={styles.map}>
        {selectedTo === null ? (
          <div className={styles.noLocationSelected}>
            <Typography variant={'h5'}>No location selected.</Typography>
          </div>
        ) : (
          <div>
            <Map
              center={{
                lat: selectedTo.coordinate.lat,
                lng: selectedTo.coordinate.lng,
              }}
              width={'100%'}
              height={'400px'}
            >
              <MapPin
                lat={selectedTo.coordinate.lat}
                lng={selectedTo.coordinate.lng}
              />
            </Map>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToSection;
