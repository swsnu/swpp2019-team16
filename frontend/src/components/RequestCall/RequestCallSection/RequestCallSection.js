import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Heading from '../../common/Heading';
import PropTypes from 'prop-types';
import recognizer from '../../../lib/azure';
import Checkbox from 'components/common/Checkbox/index';
import { UserPropsTypes } from '../../../types/user';
import { GroupPropTypes } from '../../../types/group';

const RequestCallBlock = styled.div``;

RequestCallSection.propTypes = {
  user: UserPropsTypes,
  group: GroupPropTypes.isRequired,
  onClickRequestCall: PropTypes.func.isRequired,
};

function RequestCallSection({ user, group, onClickRequestCall }) {
  const [speechToText, setSpeechToText] = useState(false);
  const triggerText = 'Stop';

  // TODO: add test case
  // TODO: refactor speech recognizer -> create SpeechRecognizer class
  const onSTTHandler = useCallback(() => {
    if (!speechToText) {
      console.log('Active STT');
      recognizer.recognized = (r, event) => {
        console.log('Recognized message: ' + event.result.text);
        if (event.result.text.includes(triggerText)) {
          console.log('Triggered message: ' + triggerText);
          onClickRequestCall({
            groupId: group.groupId,
            driverId: user.id,
          });
        }
      };
      recognizer.startContinuousRecognitionAsync();
    } else {
      console.log('Deactive STT');
      recognizer.stopContinuousRecognitionAsync();
    }
    setSpeechToText(!speechToText);
  }, [group, user, speechToText, onClickRequestCall]);

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
          onClick={() =>
            onClickRequestCall({
              groupId: group.groupId,
              driverId: user.id,
            })
          }
          children="Accept the Request!"
        />
        <Checkbox
          value={'STT Mode'}
          name={'STT'}
          onClick={onSTTHandler}
          checked={speechToText}
        />
      </div>
    </RequestCallBlock>
  );
}

export default RequestCallSection;
