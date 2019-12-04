import React, { useState } from 'react';
import clns from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import FromSection from './FromSection';
import ToSection from './ToSection';
import MinimumPassengerSection from './MinimumPassengerSection';
import DecideSection from './DecideSection';
import FullPage from '@fullpage/react-fullpage';
import theme from '../../../lib/styles/theme';
import { UserPropsTypes } from '../../../types/user';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fromSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '32px',
    paddingRight: '32px',

    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
  toSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  minimumPassenger: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',

    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
  },
  decide: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',

    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.contrastText,
  },
});

CarpoolRequestSection.propTypes = {
  user: UserPropsTypes,
  fromLocationList: PropTypes.array.isRequired,
  toLocationList: PropTypes.array.isRequired,
  minimumPassengerList: PropTypes.array.isRequired,
  onCarpoolRequest: PropTypes.func.isRequired,
};

function CarpoolRequestSection({
  user,
  fromLocationList,
  toLocationList,
  minimumPassengerList,
  onCarpoolRequest,
}) {
  const styles = useStyles();
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [minimumPassenger, setMinimumPassenger] = useState(null);

  const onSendRequest = () => {
    if (!fromLocation || !toLocation || !minimumPassenger) {
      window.alert('Please check your request');
      return;
    }

    onCarpoolRequest({
      riderId: user.id,
      from: fromLocation.name,
      to: toLocation.name,
      minimumPassenger: minimumPassenger,
    });
  };

  return (
    <FullPage
      scrollingSpeed={1000}
      render={() => {
        return (
          <FullPage.Wrapper>
            <div className={'section'}>
              <div className={styles.container}>
                <FromSection
                  fromList={fromLocationList}
                  selectedFrom={fromLocation}
                  onClickFrom={setFromLocation}
                />
              </div>
            </div>
            <div className={clns('section', styles.toSection)}>
              <div className={styles.container}>
                <ToSection
                  toList={toLocationList}
                  selectedTo={toLocation}
                  onClickTo={setToLocation}
                />
              </div>
            </div>
            <div
              className={clns('section', styles.minimumPassenger)}
              data-testid="minimumPassenger"
            >
              <MinimumPassengerSection
                minimumPassengerOptions={minimumPassengerList}
                selectedMinimumPassenger={minimumPassenger}
                onClickMinimumPassenger={setMinimumPassenger}
              />
            </div>
            <div className={clns('section', styles.decide)}>
              <DecideSection onClick={onSendRequest} />
            </div>
          </FullPage.Wrapper>
        );
      }}
    />
  );
}

export default CarpoolRequestSection;
