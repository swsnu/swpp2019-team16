import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import theme from '../../lib/styles/theme';

const RiderDetailStyles = makeStyles({
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

RiderDetail.propTypes = {
  group: PropTypes.object.isRequired,
};

function RiderDetail({ group }) {
  const styles = RiderDetailStyles();
  return (
    <div className={styles.root}>
      <div className={styles.whiteBox}>
        <div className={styles.container}>
          <Typography variant={'body1'}>From: {group.from}</Typography>
        </div>
        <div className={styles.container}>
          <Typography variant={'body1'}>To: {group.to}</Typography>
        </div>
      </div>
    </div>
  );
}
export default RiderDetail;
