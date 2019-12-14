import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
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
    width: '1000px',
    background: 'white',
    borderRadius: '2px',
    justifyContent: 'center',
    alignItems: 'center',
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

function NotFound({ history }) {
  const styles = useStyles();

  const onClickGoHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <div className={styles.root}>
      <div className={styles.whiteBox}>
        <div className={styles.container}>
          <Typography variant="h1">404</Typography>
        </div>
        <div className={styles.container}>
          <Typography variant="h1">Page Not Found</Typography>
        </div>
        <div className={styles.container}>
          <Typography variant="h2">
            This is not the page you are looking for
          </Typography>
        </div>
        <div className={styles.container}>
          <div
            className={styles.button}
            children="Go Home"
            variant="contained"
            fullwidth="false"
            onClick={onClickGoHome}
          />
        </div>
      </div>
    </div>
  );
}
export default withRouter(NotFound);
