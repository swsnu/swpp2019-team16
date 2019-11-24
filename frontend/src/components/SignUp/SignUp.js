import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';
import Rider from './Rider';
import Driver from './Driver';

const SignUpBlock = styled.div``;

SignUp.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const signUpMode = {
  rider: 'rider',
  driver: 'driver',
};

function SignUp({ form, onChange, onClick }) {
  const [mode, setMode] = useState(signUpMode.rider);

  const onCheckRider = () => {
    setMode(signUpMode.rider);
    form.userType = 'rider';
  };

  const onCheckDriver = () => {
    setMode(signUpMode.driver);
    form.userType = 'driver';
  };

  return (
    <SignUpBlock>
      <Typography variant="h3">Join Ya-Ta!</Typography>
      <Typography variant="h1">Create Your Account</Typography>
      <Button children="I am a Rider" onClick={onCheckRider} />
      <Button children="I am a Driver" onClick={onCheckDriver} />
      {mode === signUpMode.rider ? (
        <Rider form={form} onChange={onChange} onClick={onClick} />
      ) : (
        <Driver form={form} onChange={onChange} onClick={onClick} />
      )}
    </SignUpBlock>
  );
}

export default SignUp;
