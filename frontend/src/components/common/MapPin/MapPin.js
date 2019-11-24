import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PersonPin from '@material-ui/icons/PersonPin';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)',
  },
  icon: {
    width: '50px',
    height: '50px',
  }
});

function MapPin() {
  const styles = useStyles();
  return (
    <IconButton
      classes={{
        root: styles.root,
      }}
    >
      <PersonPin
        classes={{
          root: styles.icon,
        }}
        color={'secondary'}
      />
    </IconButton>
  );
};

export default MapPin;