import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

HeadingMaterial.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string.isRequired,
};

function HeadingMaterial({ title }) {
  return (
    <Typography 
      variant="h2" 
      title={title}
    >
    {title}
    </Typography>    
  );
}

export default HeadingMaterial;
