import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

TextInputMaterial.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  inputProps: PropTypes.object,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  margin: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
};

function TextInputMaterial({
  label,
  defaultValue,
  inputProps,
  value,
  name,
  type,
  onChange,
  margin,
  variant,
  fullWidth,
}) {
  return (
    <TextField
      label={label}
      defaultValue={defaultValue}
      inputProps={inputProps}
      value={value}
      name={name}
      type={type}
      onChange={onChange}
      margin="normal"
      variant="outlined"
      fullWidth={fullWidth}
    />
  );
}

export default TextInputMaterial;
