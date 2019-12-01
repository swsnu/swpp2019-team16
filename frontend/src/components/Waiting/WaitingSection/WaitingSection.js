import React, { useState, useEffect } from 'react';
import quoteGenerator from 'inspirational-quotes';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: '3rem',
  },
  progress: {
    marginBottom: '3rem',
  },
  quote: {
    maxWidth: '500px',
    textAlign: 'center',
  },
});

function WaitingSection() {
  const styles = useStyles();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const taskId = setInterval(() => {
      setQuote(quoteGenerator.getRandomQuote())
    }, 4000);
    return () => clearInterval(taskId);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant={"h4"}>
          We are making carpool group
        </Typography>
      </div>
      <div className={styles.progress}>
        <CircularProgress />
      </div>
      <div className={styles.quote}>
        <Typography variant={"body1"}>
          {quote}
        </Typography>
      </div>
    </div>
  );
};

export default WaitingSection;