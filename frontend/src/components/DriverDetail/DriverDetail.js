import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';

const DriverDetailBlock = styled.div``;

DriverDetail.propTypes = {
  groupId: PropTypes.number.isRequired,
  onClickConfirm: PropTypes.func.isRequired,
};

function DriverDetail({ groupId, onClickConfirm }) {
  const [totalCost, setTotalCost] = useState(0);
  
  return (
    <DriverDetailBlock>
      <input
        type="text"
        id="total-cost-input"
        name="TotalCost"
        placeholder="Total Cost"
        onChange={e => setTotalCost(e.target.value)}
        value={totalCost}
      />

      <Button
        children="Confirm"
        variant="contained"
        fullwidth="false"
        onClick={()=> onClickConfirm({groupId, totalCost})}
      />
      
    </DriverDetailBlock>
  );
}
export default DriverDetail;
