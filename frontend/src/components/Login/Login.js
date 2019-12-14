import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
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
    width: '400px',
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
    marginLeft: '10px',
    marginRight: '10px',
  },
});

Login.propTypes = {
  loginInfo: PropTypes.object.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  onClickRegister: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Login({ loginInfo, onChange, onClickLogin, onClickRegister }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.whiteBox}>
        <div className={styles.container}>
          <Typography variant="h3">Login to Ya-Ta!</Typography>
        </div>
        <div className={styles.container}>
          <input
            type="text"
            id="email-input"
            name="email"
            placeholder="email"
            onChange={onChange}
            value={loginInfo.email}
          />
        </div>
        <div className={styles.container}>
          <input
            type="password"
            id="password-input"
            name="password"
            placeholder="password"
            onChange={onChange}
            value={loginInfo.password}
          />
        </div>
        <div className={styles.container}>
          <div
            className={styles.button}
            children="Login"
            variant="contained"
            fullwidth="false"
            onClick={onClickLogin}
          />
          <div
            className={styles.button}
            children="Register"
            variant="contained"
            fullwidth="false"
            onClick={onClickRegister}
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
