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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
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
  },
});

CarpoolRequestSection.propTypes = {
  user: PropTypes.object.isRequired,
  fromList: PropTypes.array.isRequired,
  toList: PropTypes.array.isRequired,
  minimumPassenger: PropTypes.array.isRequired,
  onClickRequest: PropTypes.func.isRequired,
};

function CarpoolRequestSection({
  user,
  fromList,
  toList,
  minimumPassenger, // TODO: change prop name
  onClickRequest,
}) {
  const styles = useStyles();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [minPassenger, setMinPassenger] = useState(null);

  const onButtonClickHandler = () => {
    if (
      user === null ||
      from === null ||
      to === null ||
      minPassenger === null
    ) {
      window.alert('Please Check!');
      return;
    }

    onClickRequest({
      userId: 1,
      from: from,
      to: to,
      minimumPassenger: minPassenger,
    });
  };

  return (
    <FullPage
      scrollingSpeed={1000}
      render={({ state, fullpageApi }) => {
        return (
          <FullPage.Wrapper>
            <div className={clns("section", styles.fromSection)}  data-testid="from">
              <FromSection
                fromList={fromList}
                selectedFrom={from}
                onClickFrom={setFrom}
              />
            </div>
            <div className="section" data-testid="to">
              <ToSection
                toList={toList}
                selectedTo={to}
                onClickTo={setTo}
              />
            </div>
            <div className="section" data-testid="minimumPassenger">
              <MinimumPassengerSection
                minimumPassengerOptions={minimumPassenger}
                selectedMinimumPassenger={minPassenger}
                onClickMinimumPassenger={setMinPassenger}
              />
            </div>
            <div className="section">
              <DecideSection onClick={onButtonClickHandler}/>
            </div>
          </FullPage.Wrapper>
        )
      }}
    />
  );
}

export default CarpoolRequestSection;
