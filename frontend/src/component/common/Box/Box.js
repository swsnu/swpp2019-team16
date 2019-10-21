import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

BoxMaterial.propTypes = {
  children: PropTypes.node.isRequired,
};

<<<<<<< HEAD
function BoxMaterial({
  children,
}) {
  return (
    <Box>
      {children}
    </Box>
  );
=======
function BoxMaterial({ children }) {
  return <Box>{children}</Box>;
>>>>>>> 270d9b702ea587f84257ee7fdc79d25252846e87
}

export default BoxMaterial;
