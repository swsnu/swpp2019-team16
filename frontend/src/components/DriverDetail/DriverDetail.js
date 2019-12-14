import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';

const DriverDetailBlock = styled.div``;

DriverDetail.propTypes = {
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  onClickConfirm: PropTypes.func.isRequired,
};

function DriverDetail({ user, group, onClickConfirm }) {
  const [totalCost, setTotalCost] = useState(0);
  const userId = user.id;
  const groupId = group.groupId;

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
        onClick={() => onClickConfirm({ userId, groupId, totalCost })}
      />
    </DriverDetailBlock>
  );
}
export default DriverDetail;
