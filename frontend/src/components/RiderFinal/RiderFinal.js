import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import theme from '../../lib/styles/theme';

const RiderFinalStyles = makeStyles({
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
    marginBottom: '20px',
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
    marginRight: '10px'
  },
});

RiderFinal.propTypes = {
  group: PropTypes.object.isRequired,
};

function RiderFinal({ group, onClickGoToMain }) {
  const styles = RiderFinalStyles();
  const premiumTotalCost = Math.floor((group.totalCost * 1.2) / 100) * 100;
  const riderFee = group.riderCost;
  const saved = premiumTotalCost - riderFee;
  console.log("rider final component");
  return (
    <div className={styles.root}>
      <div className={styles.whiteBox}>
        <div className={styles.container}>
          <Typography variant={'body1'}>TotalCost is {premiumTotalCost}</Typography>
          <Typography variant={'body1'}>Your fee {riderFee}</Typography>
          <Typography variant={'body1'}>You saved {saved}</Typography>
          <div className={styles.button}
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
export default RiderFinal;
