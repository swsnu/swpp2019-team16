import React from 'react';
import { makeStyles } from '@material-ui/styles';
import theme from '../../lib/styles/theme';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const DriverFinalStyles = makeStyles({
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
    marginTop: '20px',
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

DriverFinal.propTypes = {
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  onClickGoToMain: PropTypes.func.isRequired,
};

function DriverFinal({ user, group, onClickGoToMain }) {
  const styles = DriverFinalStyles();
  const earning = Math.floor((group.totalCost * 1.2) / 100) * 100;
  const premium = earning - group.totalCost;
  const point = user.point;

  return (
    <div className={styles.root}>
      <div className={styles.whiteBox}>
        <div className={styles.container}>
          <Typography variant="h3">Total Earning: {earning}&#8361;</Typography>
        </div>
        <div className={styles.container}>
          <Typography variant="h3">Current Point: {point}&#8361;</Typography>
        </div>
        <div className={styles.container}>
          <Typography variant="h3">
            You earned {premium}&#8361; more!
          </Typography>
        </div>
        <div className={styles.container}>
          <div
            className={styles.button}
            children="Go To Main"
            variant="contained"
            fullwidth="false"
            onClick={() => onClickGoToMain()}
          />
        </div>
      </div>
    </div>
  );
}
export default DriverFinal;
