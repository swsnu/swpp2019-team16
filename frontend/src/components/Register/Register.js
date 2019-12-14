import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Rider from './Rider';
import Driver from './Driver';
import { makeStyles } from '@material-ui/styles';
import theme from '../../lib/styles/theme';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBox: {
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    width: '360px',
    background: 'white',
    borderRadius: '2px',
  },
  button: {
    active: {
      background: theme.palette.primary.dark,
    },
    background: 'white',
    borderRadius: 5,
    color: 'black',
    cursor: 'pointer',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingBottom: '0.3rem',
    paddingTop: '0.3rem',
    marginBottom: '10px',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
  },
});

Register.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const registerMode = {
  rider: 'rider',
  driver: 'driver',
};

function Register({ form, onChange, onClick }) {
  const styles = useStyles();
  const [mode, setMode] = useState(registerMode.rider);

  const onCheckRider = () => {
    setMode(registerMode.rider);
    form.userType = 'rider';
  };

  const onCheckDriver = () => {
    setMode(registerMode.driver);
    form.userType = 'driver';
  };

  return (
    <div className={styles.root}>
      <div className={styles.whiteBox}>
        <div className={styles.container}>
          <Typography variant="h4">Join Ya-Ta!</Typography>
        </div>
        <div className={styles.container}>
          <Typography variant="h3">Create Your Account</Typography>
        </div>
        <div className={styles.container}>
          <Typography variant="h4">What are you?</Typography>
        </div>
        <div className={styles.container}>
          <div
            className={styles.button}
            children="I am a Rider"
            onClick={onCheckRider}
          />
          <div
            className={styles.button}
            children="I am a Driver"
            onClick={onCheckDriver}
          />
        </div>
        <div className={styles.container}>
          {mode === registerMode.rider ? (
            <Rider form={form} onChange={onChange} onClick={onClick} />
          ) : (
            <Driver form={form} onChange={onChange} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
