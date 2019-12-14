import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import theme from '../../lib/styles/theme';

const useStyles = makeStyles({
  container: {
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  whiteBox: {
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    width: '360px',
    background: 'white',
    borderRadius: '2px',
  },
  button: {
    background: theme.palette.primary.dark,
    borderRadius: 5,
    color: 'white',
    cursor: 'pointer',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingBottom: '0.3rem',
    paddingTop: '0.3rem',
    marginBottom: '10px',
    marginTop: '10px',
  },
});

Driver.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Driver({ form, onChange, onClick }) {
  const styles = useStyles();
  return (
    <div className={styles.whiteBox}>
      <div className={styles.container}>
        <Typography variant="h4">Driver Info</Typography>
        <Typography variant="h5">Email</Typography>
        <input
          type="text"
          id="email-input"
          name="email"
          onChange={onChange}
          value={form.email}
        />
        <Typography variant="h5">Password</Typography>
        <input
          type="password"
          id="password-input"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        <Typography variant="h5">Password Confirm</Typography>
        <input
          type="password"
          id="password-confirmation-input"
          name="passwordConfirmation"
          onChange={onChange}
          value={form.passwordConfirmation}
        />
      </div>
      <div className={styles.container}>
        <Typography variant="h4">Vehicle Info</Typography>
        <Typography variant="h5">Car Type</Typography>
        <input
          type="text"
          id="car-type-input"
          name="carType"
          onChange={onChange}
          value={form.vehicleInfo}
        />
        <Typography variant="h5">Plate No.</Typography>
        <input
          type="text"
          id="plate-no-input"
          name="plateNo"
          onChange={onChange}
          value={form.vehicleInfo}
        />
        <div
          className={styles.button}
          children="Confirm"
          onClick={onClick}
          variant="contained"
          fullwidth="false"
        />
      </div>
    </div>
  );
}

export default Driver;
