import clns from 'classnames';
import FullPage from '@fullpage/react-fullpage';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import theme from '../../../lib/styles/theme';
import Typography from '@material-ui/core/Typography';
import ButtonMaterial from '../../common/Button';

const useWhatIsSectionStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '0',

    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,

    paddingLeft: '10px',
    paddingRight: '10px',
  },
  title: {
    marginLeft: '200px',
    marginRight: '200px',
    marginBottom: '24px',
  },
  content: {
    marginLeft: '200px',
    marginRight: '200px',
    fontSize: '24px',
    lineHeight: '28px',
  },
  lastContent: {
    marginLeft: '200px',
    marginRight: '200px',
    fontSize: '24px',
    lineHeight: '28px',
    marginBottom: '50px',
  },
  getStartedButton: {
    marginLeft: '220px',
    marginRight: '200px',
    marginBottom: '100px',
  },
});

WhatIsSection.propTypes = {
  onStart: PropTypes.func.isRequired,
};

function WhatIsSection({ onStart }) {
  const styles = useWhatIsSectionStyles();
  return (
    <div className={clns('section', styles.root)}>
      <div className={styles.title}>
        <Typography variant="h1">Ya-Ta comes to rescue!</Typography>
      </div>
      <div className={styles.content}>
        <Typography variant="h2">
          Ya-Ta helps students who need to urgently get to class
        </Typography>
      </div>
      <div className={styles.content}>
        <Typography variant="h2">
          through luring taxi drivers with the incentives
        </Typography>
      </div>
      <div className={styles.lastContent}>
        <Typography variant="h2">
          and save money through a carpool system
        </Typography>
      </div>
      <div className={styles.getStartedButton}>
        <ButtonMaterial size={'large'} color={'secondary'} onClick={onStart}>
          Get Started
        </ButtonMaterial>
      </div>
    </div>
  );
}

const useSubSectionStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '0',

    backgroundColor: theme.palette.white,
    color: theme.palette.text.primary,

    paddingLeft: '10px',
    paddingRight: '10px',
  },
  title: {
    marginLeft: '200px',
    marginRight: '200px',
    marginBottom: '24px',
  },
  subtitle: {
    marginLeft: '200px',
    marginRight: '200px',
    marginBottom: '50px',
  },
  getStartedButton: {
    marginLeft: '220px',
    marginRight: '200px',
    marginBottom: '100px',
  },
});

SubSection.propTypes = {
  onStart: PropTypes.func.isRequired,
};

function SubSection({ onStart }) {
  const styles = useSubSectionStyles();
  return (
    <div className={clns('section', styles.root)}>
      <div className={styles.title}>
        <Typography variant="h1">The clock is ticking.</Typography>
      </div>
      <div className={styles.subtitle}>
        <Typography variant="h2">
          The professor will check the attendance as soon as class starts
        </Typography>
      </div>
      <div className={styles.getStartedButton}>
        <ButtonMaterial size={'large'} onClick={onStart}>
          Get Started
        </ButtonMaterial>
      </div>
    </div>
  );
}

const useMainSectionStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '0',

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,

    paddingLeft: '10px',
    paddingRight: '10px',
  },
  title: {
    marginLeft: '200px',
    marginRight: '200px',
    marginBottom: '24px',
  },
  subtitle: {
    marginLeft: '200px',
    marginRight: '200px',
    marginBottom: '50px',
  },
  getStartedButton: {
    marginLeft: '220px',
    marginRight: '200px',
    marginBottom: '100px',
  },
});

MainSection.propTypes = {
  onStart: PropTypes.func.isRequired,
};

function MainSection({ onStart }) {
  const styles = useMainSectionStyles();
  return (
    <div className={clns('section', styles.root)}>
      <div className={styles.title}>
        <Typography variant="h1">
          No more waiting long line of SNU shuttle bus!
        </Typography>
      </div>
      <div className={styles.subtitle}>
        <Typography variant="h2">
          On a bad day, it may take around 20~30 minutes to get to class
        </Typography>
      </div>
      <div className={styles.getStartedButton}>
        <ButtonMaterial size={'large'} color={'secondary'} onClick={onStart}>
          Get Started
        </ButtonMaterial>
      </div>
    </div>
  );
}

Introduction.propTypes = {
  onStart: PropTypes.func.isRequired,
};

function Introduction({ onStart }) {
  return (
    <FullPage
      scrollingSpeed={1000}
      render={({ state, fullpageApi }) => {
        return (
          <FullPage.Wrapper>
            <MainSection onStart={onStart} />
            <SubSection onStart={onStart} />
            <WhatIsSection onStart={onStart} />
          </FullPage.Wrapper>
        );
      }}
    />
  );
}

export default Introduction;
