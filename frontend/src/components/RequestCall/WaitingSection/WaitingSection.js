import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {},
});

function WaitingSection() {
  const styles = useStyles();
  return <div className={styles.root}>Waiting for group to be matched...</div>;
}

export default WaitingSection;
