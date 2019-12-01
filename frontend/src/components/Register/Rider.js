import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../common/Box/Box';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';

const RiderBlock = styled.div``;

Rider.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Rider({ form, onChange, onClick }) {
  return (
    <RiderBlock>
      <Box>
        <Typography variant="h4">Email</Typography>
        <input
          type="text"
          id="email-input"
          name="email"
          onChange={onChange}
          value={form.email}
        />
        <Typography variant="h4">Password</Typography>
        <input
          type="password"
          id="password-input"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        <Typography variant="h4">Password Confirm</Typography>
        <input
          type="password"
          id="password-confirmation-input"
          name="passwordConfirmation"
          onChange={onChange}
          value={form.passwordConfirmation}
        />
        <Box>
          <Button
            children="Confirm"
            onClick={onClick}
            variant="contained"
            fullwidth="false"
          />
        </Box>
      </Box>
    </RiderBlock>
  );
}

export default Rider;
