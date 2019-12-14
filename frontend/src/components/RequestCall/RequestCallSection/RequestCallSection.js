import React, { useCallback, useState } from 'react';
import Button from '../../common/Button';
import PropTypes from 'prop-types';
import recognizer from '../../../lib/azure';
import Checkbox from 'components/common/Checkbox/index';
import { UserPropsTypes } from '../../../types/user';
import { GroupPropTypes } from '../../../types/group';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import theme from '../../../lib/styles/theme';

const RequestCallStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    display: 'flex',
    alignItems: 'left',
  },
  row: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  groupinfo: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
  },
  checkbox: {
    marginBottom: '10px',
    marginTop: '10px',
    marginLeft: '60px',
    alignItems: 'right'
  },
  whiteBox: {
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    width: '400px',
    background: 'white',
    borderRadius: '2px',
  },
  button: {
    alignItems: 'center',
    background: theme.palette.primary.dark,
    borderRadius: 5,
    color: 'white',
    cursor: 'pointer',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingBottom: '0.3rem',
    paddingTop: '0.3rem',
    marginBottom: '10px',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  content:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25px',
  }
});

RequestCallSection.propTypes = {
  user: UserPropsTypes,
  group: GroupPropTypes,
  onClickRequestCall: PropTypes.func.isRequired,
};

function RequestCallSection({ user, group, onClickRequestCall }) {
  const styles = RequestCallStyles();
  const [speechToText, setSpeechToText] = useState(false);
  const triggerText = 'Stop';

  // TODO: add test case
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
    <div className={styles.root}>
      <div className={styles.whiteBox}>
        <div className={styles.row}>
          <div className={styles.title}>
            <Typography variant="h3">Request Call</Typography>
          </div>
          <div className={styles.checkbox}>
            <Checkbox
              value={'STT Mode'}
              name={'STT'}
              onClick={onSTTHandler}
              checked={speechToText}
            />
          </div>
        </div>
        {group == null ? (<div className={styles.content}>
          <Typography variant="body1">Waiting for Carpool Request...</Typography>
        </div>) : ( 
        <div className={styles.groupinfo}>
          <Typography variant="body1">From: {group.from}</Typography>
          <Typography variant="body1">To: {group.to}</Typography>
          <div className={styles.content}>
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
          </div>
        </div>)
        }
      </div>
    </div>
  );
}

export default RequestCallSection;
