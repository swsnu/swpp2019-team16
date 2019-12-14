import PropTypes from 'prop-types';
import { UserPropsTypes } from './user';

export const GroupPropTypes = PropTypes.shape({
  groupId: PropTypes.number.isRequired,
  driver: UserPropsTypes,
  riders: PropTypes.arrayOf(UserPropsTypes).isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
});
