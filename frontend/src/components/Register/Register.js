import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';
import Rider from './Rider';
import Driver from './Driver';

const RegisterBlock = styled.div``;

Register.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const registerMode = {
  rider: 'rider',
  driver: 'driver',
};

function Register({ form, onChange, onClick }) {
  const [mode, setMode] = useState(registerMode.rider);

  const onCheckRider = () => {
    setMode(registerMode.rider);
    form.userType = 'rider';
  };

  const onCheckDriver = () => {
    setMode(registerMode.driver);
    form.userType = 'driver';
  };

  return (
    <RegisterBlock>
      <Typography variant="h3">Join Ya-Ta!</Typography>
      <Typography variant="h1">Create Your Account</Typography>
      <Button children="I am a Rider" onClick={onCheckRider} />
      <Button children="I am a Driver" onClick={onCheckDriver} />
      {mode === registerMode.rider ? (
        <Rider form={form} onChange={onChange} onClick={onClick} />
      ) : (
        <Driver form={form} onChange={onChange} onClick={onClick} />
      )}
    </RegisterBlock>
  );
}

export default Register;
