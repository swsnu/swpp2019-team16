import PropTypes from 'prop-types';

export const GroupPropTypes = PropTypes.shape({
  groupId: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
});
