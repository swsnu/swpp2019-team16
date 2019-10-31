import React from 'react';
import ButtonMaterial from 'components/common/Button';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Introduction.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

Introduction.propTypes = {
  onStart: PropTypes.func.isRequired,
};

function Introduction({ onStart }) {
  return (
    <div className="Introduction">
      <Typography variant="h1" gutterBotom paragraph>
        Welcome to YA-TA!
      </Typography>

      <Typography variant="h3" gutterBotom>
        What is yata?
      </Typography>

      <Typography variant="h5" gutterBotom paragraph>
        Ya-Ta helps students who need to urgently get to class. Within ten
        minutes, Ya-Ta groups students with these similar, urgent, needs, and
        grabs a taxi for them.
      </Typography>

      <div className="startButton">
        <ButtonMaterial
          children="Start!"
          variant="contained"
          color="primary"
          onClick={onStart}
        />
      </div>
    </div>
  );
}

export default Introduction;
