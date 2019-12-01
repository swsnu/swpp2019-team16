import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Heading from '../../common/Heading';
import PropTypes from 'prop-types';
import recognizer from '../../../lib/azure'
import Checkbox from 'components/common/Checkbox/index';

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
  
  const [speechToText, setSpeechToText] = useState(false);
  const triggerText = "Stop";
  const groupId = group.groupId;
  const driverId = user.driverId;

  const onButtonClickHandler = () => {
    onClickRequestCall({groupId, driverId})
  }

  let onSTTHandler = () => {
    if(!speechToText){
      console.log("Active STT")
      recognizer.recognized = (r, event) => {
        console.log("Recognized message: " + event.result.text);
        if(event.result.text.includes(triggerText)){
          console.log("Triggered message: " + triggerText)
        }
      };
      recognizer.startContinuousRecognitionAsync();
    }
    else{
      console.log("Deactive STT")
      recognizer.stopContinuousRecognitionAsync();
    }
    setSpeechToText(speechToText ? false : true)
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
        <Checkbox
          value={"STT Mode"}
          name={'STT'}
          onClick={onSTTHandler}
          checked={speechToText} 
        />
      </div>
    </RequestCallBlock>
  );
}

export default RequestCallSection;
