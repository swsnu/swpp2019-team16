import PropTypes from 'prop-types';

export const UserPropsTypes = PropTypes.shape({
  // rider/driver id
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['IDLE', 'ON_TAXI', 'DRIVING']).isRequired,
  // group id
  group: PropTypes.number,
  user: PropTypes.shape({
    // user id
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    user_type: PropTypes.oneOf(['rider', 'driver']).isRequired,
    vehicle: PropTypes.shape({
      car_type: PropTypes.string.isRequired,
      plate_no: PropTypes.string.isRequired,
    }),
  }).isRequired,
});
