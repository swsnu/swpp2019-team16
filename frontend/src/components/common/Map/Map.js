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
  children: PropTypes.node.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number,
};

function Map({ width, height, children, center, zoom = 17 }) {
  const styles = useStyles({ width, height });
  return (
    <div className={styles.root}>
      <GoogleMap center={center} defaultZoom={zoom}>
        {children}
      </GoogleMap>
    </div>
  );
}

export default Map;
