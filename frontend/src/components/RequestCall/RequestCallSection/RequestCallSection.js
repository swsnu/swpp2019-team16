import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Heading from '../../common/Heading';
import PropTypes from 'prop-types';
import recognizer from '../../../lib/speech'

const RequestCallBlock = styled.div``;

RequestCallSection.propTypes = {
  user: PropTypes.object.isRequired,
  onClickRequestCall: PropTypes.func.isRequired,
};

function RequestCallSection({
  user,
  onClickRequestCall,
}) {
  //const [groupId, setGroupId] = useState(null);
  const groupId = 1
  const driverId = 1
  
  let onButtonClickHandler = () => {
    onClickRequestCall({groupId, driverId})
  }


  return (
    <RequestCallBlock className="requestCallBlock">
      <div className="title">
        <Heading title="Request Call!" />
      </div>
      <div className="button">
        <Button
          id="request-call-submit-button"
          variant="contained"
          color="primary"
          onClick={onButtonClickHandler}
          children="Accept the Request!"
        />
      </div>
    </RequestCallBlock>
  );
}

export default RequestCallSection;
