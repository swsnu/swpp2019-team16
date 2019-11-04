import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

CheckboxLabels.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default function CheckboxLabels({ name, value, onClick, checked }) {
  return (
    <FormControlLabel
      data-testid={value}
      control={
        <Checkbox
          name={name}
          onClick={onClick}
          value={value}
          checked={checked}
          color="primary"
        />
      }
      label={value}
    />
  );
}
