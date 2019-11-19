import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../common/Box/Box';
import Button from '../common/Button/Button';

const SignUpBlock = styled.div``;

SignUp.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

function SignUp({ form, onChange, onClick }) {
  return (
    <SignUpBlock>
      <h3>Join Ya-Ta!</h3>
      <h1>Create Your Account</h1>
      <Box>
        <h3>Email</h3>
        <input
          type="text"
          id="email-input"
          name="email"
          onChange={onChange}
          value={form.email}
        />
        <h3>Password</h3>
        <input
          type="password"
          id="password-input"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        <h3>Password Confirm</h3>
        <input
          type="password"
          id="password-confirmation-input"
          name="passwordConfirmation"
          onChange={onChange}
          value={form.passwordConfirmation}
        />
        <h3>Vehicle Info (for Driver users)</h3>
        <input
          type="text"
          id="vehicle-info-input"
          name="vehicleInfo"
          onChange={onChange}
          value={form.vehicleInfo}
        />
        <h3>
          <Button
            children="Confirm"
            onClick={onClick}
            variant="contained"
            fullwidth="false"
          />
        </h3>
      </Box>
    </SignUpBlock>
  );
}

export default SignUp;
