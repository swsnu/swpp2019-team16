import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: props => props.width,
    height: props => props.height,
  },
});

Map.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

function Map({ width, height, children, center }) {
  const styles = useStyles({ width, height });
  return (
    <div className={styles.root}>
      <GoogleMap center={center} defaultZoom={17}>
        {children}
      </GoogleMap>
    </div>
  );
}

export default Map;
