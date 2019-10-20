import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

BoxMaterial.propTypes = {
  children: PropTypes.node.isRequired,
};

function BoxMaterial({
  children,
}) {
  return (
    <Box>
      {children}
    </Box>
  );
}

export default BoxMaterial;
