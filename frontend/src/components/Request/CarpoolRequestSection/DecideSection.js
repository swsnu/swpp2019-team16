import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Button from '../../common/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: '25px',
  },
  content: {},
});

DecideSection.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function DecideSection({ onClick }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant={'h2'}>Are you ready to call Ya-Ta?</Typography>
      </div>
      <div className={styles.content}>
        <Button
          id="request-submit-button"
          variant="contained"
          color="secondary"
          onClick={onClick}
          children="Send Request"
        />
      </div>
    </div>
  );
}

export default DecideSection;
