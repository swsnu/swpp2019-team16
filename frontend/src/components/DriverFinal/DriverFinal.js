import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '../common/Button/Button';

const DriverFinalBlock = styled.div``;

DriverFinal.propTypes = {
  earning: PropTypes.number.isRequired,
  point: PropTypes.number.isRequired,
  onClickGoToMain: PropTypes.func.isRequired,
};

function DriverFinal({ earning, point, onClickGoToMain }) {
  return (
    <DriverFinalBlock>
      <Typography variant="h2">Total Earning: {earning}</Typography>
      <Typography variant="h2">Current Point: {point}</Typography>
      <Button
        children="Go To Main"
        variant="contained"
        fullwidth="false"
        onClick={() => onClickGoToMain()}
      />
    </DriverFinalBlock>
  );
}
export default DriverFinal;
