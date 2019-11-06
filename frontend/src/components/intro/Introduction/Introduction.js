import React, { useCallback } from 'react';
import ButtonMaterial from 'components/common/Button';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import './Introduction.css';

function Introduction({history}) {
  
  const onStart = useCallback(
    () => {
      history.push("/request");
    },
    [history],
  );

  return (
    <div className="Introduction">
      <Typography variant="h1" paragraph>
        Welcome to YA-TA!
      </Typography>

      <Typography variant="h3" >
        What is yata?
      </Typography>

      <Typography variant="h5" paragraph>
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
export default withRouter(Introduction);
