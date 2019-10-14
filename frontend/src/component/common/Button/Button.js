import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

ButtonMaterial.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  fullWidth: PropTypes.bool,
  height: PropTypes.string,
};

function ButtonMaterial({
  children,
  variant,
  color,
  onClick,
  href,
  fullWidth,
  height,
}) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      href={href}
      height={height}
    >
      {children}
    </Button>
  );
}

export default ButtonMaterial;
