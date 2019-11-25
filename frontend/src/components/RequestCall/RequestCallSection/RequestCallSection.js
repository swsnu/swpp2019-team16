import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Heading from '../../common/Heading';
import PropTypes from 'prop-types';
import recognizer from '../../../lib/speech'

const RequestCallBlock = styled.div``;

RequestCallSection.propTypes = {
  user: PropTypes.object.isRequired,
  group: PropTypes.object,
  onClickRequestCall: PropTypes.func.isRequired,
};

function RequestCallSection({
  user,
  group,
  onClickRequestCall,
}) {
  const driverId = 1 // api call을 통해 user id로 driver id 구하기...
  const groupId = 1 // group.id
  
  const onButtonClickHandler = () => {
    onClickRequestCall({groupId, driverId})
  }

  useEffect(() => {
    recognizer.recognized = (r, event) => {
      let word = 'Stop'
      console.log(event.result.text);
      if(event.result.text.includes(word)){
        recognizer.stopContinuousRecognitionAsync();
      }
    };
    recognizer.startContinuousRecognitionAsync();
  });

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
