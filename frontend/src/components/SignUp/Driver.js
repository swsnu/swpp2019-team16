import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../common/Box/Box';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';

const DriverBlock = styled.div``;

Driver.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Driver({ form, onChange, onClick }) {
  return (
    <DriverBlock>
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
        <Typography variant="h4">Vehicle Info</Typography>
        <Typography variant="h5">Car Type</Typography>
        <input
          type="text"
          id="car-type-input"
          name="carType"
          onChange={onChange}
          value={form.vehicleInfo}
        />
        <Typography variant="h5">Plate No.</Typography>
        <input
          type="text"
          id="plate-no-input"
          name="plateNo"
          onChange={onChange}
          value={form.vehicleInfo}
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
    </DriverBlock>
  );
}

export default Driver;
