import React, { useCallback, useState } from 'react';
import Button from '../../common/Button';
import PropTypes from 'prop-types';
import recognizer from '../../../lib/azure';
import Checkbox from '../../common/Checkbox';
import { makeStyles } from '@material-ui/styles';
import { UserPropsTypes } from '../../../types/user';
import { Typography } from '@material-ui/core';
import Map from '../../common/Map';
import MapPin from '../../common/MapPin';
import { GroupPropTypes } from '../../../types/group';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  map: {
    marginBottom: '1rem',
  },
  location: {
    display: 'flex',
    marginBottom: '1rem',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
            groupId: group.id,
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
      <div className={styles.title}>
        <Heading title={
          group
            ? "There's new carpool group!"
            : "We are waiting for carpool group"
        } />
      </div>
      <div>
        <Checkbox
          value={'STT Mode'}
          name={'STT'}
          onClick={onSTTHandler}
          checked={speechToText}
        />
      </div>
      {
        group && (
          <div>
            <div className={styles.map}>
              <Map
                zoom={15}
                center={{
                  lat: 37.480126,
                  lng: 126.952436,
                }}
                width={'100%'}
                height={'250px'}
              >
                <MapPin
                  lat={37.480126}
                  lng={126.952436}
                />
                <MapPin
                  lat={37.477023}
                  lng={126.961957}
                />
              </Map>
            </div>
            <div className={styles.location}>
              <Typography variant={'h3'}>
                {group.from} ~ {group.to}
              </Typography>
            </div>

            <div className={styles.button}>
              <Button
                id="request-call-submit-button"
                variant="contained"
                color="primary"
                onClick={() =>
                  onClickRequestCall({
                    groupId: group.id,
                    driverId: user.id,
                  })
                }
                children="Accept request"
              />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default RequestCallSection;
