import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import theme from '../../lib/styles/theme';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const DriverDetailStyles = makeStyles({
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


DriverDetail.propTypes = {
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  onClickConfirm: PropTypes.func.isRequired,
};

function DriverDetail({ user, group, onClickConfirm }) {
  const styles = DriverDetailStyles();
  const [totalCost, setTotalCost] = useState(0);
  const userId = user.id;
  const groupId = group.groupId;

  return (
    <div className={styles.root}>
      <div className={styles.whiteBox}>
      <div className={styles.container}>
        <Typography variant="h2">Confirm Taxi Fare</Typography>
      </div>
      <div className={styles.container}>
      <input
        type="text"
        id="total-cost-input"
        name="TotalCost"
        placeholder="Total Cost"
        onChange={e => setTotalCost(e.target.value)}
        value={totalCost}
      />

      <div className={styles.button}
        children="Confirm"
        variant="contained"
        fullwidth="false"
        onClick={() => onClickConfirm({ userId, groupId, totalCost })}
      />
      </div>
      </div>
    </div>
  );
}
export default DriverDetail;
