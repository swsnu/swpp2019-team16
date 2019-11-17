import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import theme from '../../../lib/styles/theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    fontSize: props => {
      switch (props.size) {
        case 'small':
          return '14px';
        case 'medium':
          return '13px';
        case 'large':
          return '15px';
        default:
          return '13px';
      }
    },
    height: props => {
      switch (props.size) {
        case 'small':
          return '28px';
        case 'medium':
          return '36px';
        case 'large':
          return '44px';
        default:
          return '36px';
      }
    },
    borderRadius: props => {
      switch (props.size) {
        case 'small':
          return '4px';
        case 'medium':
          return '4px';
        case 'large':
        default:
          return '4px';
      }
    },
  },
  contained: {
    boxShadow: props => props.disableShadow ? 'none' : '',
    border: props => props.disableShadow ? '1px solid #E7E7E7' : 'none',
    color: props => {
      switch (props.color) {
        case 'primary':
          return theme.palette.primary.contrastText;
        case 'secondary':
          return theme.palette.text.primary;
        default:
          return theme.palette.primary.contrastText;
      }
    },
    backgroundColor: props => {
      switch (props.color) {
        case 'primary':
          return theme.palette.primary.dark;
        case 'secondary':
          return theme.palette.primary.contrastText;
        default:
          return theme.palette.primary.dark;
      }
    }
  },
  text: {
    color: props => {
      switch (props.color) {
        case 'primary':
          return theme.palette.primary.contrastText;
        case 'secondary':
          return theme.palette.text.primary;
        default:
          return theme.palette.primary.contrastText;
      }
    },
  }
});

ButtonMaterial.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf('contained', 'text'),
  color: PropTypes.oneOf('primary', 'secondary'),
  backgroundColor: PropTypes.oneOf('primary', 'secondary'),
  size: PropTypes.oneOf('small', 'medium', 'large'),
  onClick: PropTypes.func,
  href: PropTypes.string,
  fullWidth: PropTypes.bool,
};

function ButtonMaterial({
  children,
  variant = 'contained',
  color = 'primary',
  backgroundColor = 'primary',
  size = 'medium',
  disableShadow = false,
  fullWidth = false,
  onClick = () => {},
  href,
  endIcon,
}) {
  const styles = useStyles({ size, color, backgroundColor, disableShadow });
  return (
    <Button
      classes={{
        root: styles.root,
        contained: styles.contained,
        text: styles.text,
      }}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      href={href}
      endIcon={endIcon}
    >
      {children}
    </Button>
  );
}

export default ButtonMaterial;
