import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';
const RequestBlock = styled.div``;

Request.propTypes = {
  user: PropTypes.object.isRequired,
  fromList: PropTypes.array.isRequired,
  toList: PropTypes.array.isRequired,
  minimumPassenger: PropTypes.array.isRequired,
  onClickRequest: PropTypes.func.isRequired,
};

function Request({ user, fromList, toList, minimumPassenger, onClickRequest }) {
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
      userId: user.id,
      from: from,
      to: to,
      minimumPassenger: minPassenger,
    });
  };

  return (
    <RequestBlock>
      <div data-testid="from">
        <h2>From</h2>
        {fromList &&
          fromList.map(value => (
            <Checkbox
              key={value}
              name={'from'}
              value={value}
              onClick={() => (from === value ? setFrom(null) : setFrom(value))}
              checked={value === from}
            />
          ))}
      </div>

      <div data-testid="to">
        <h2>To</h2>
        {toList &&
          toList.map(value => (
            <Checkbox
              key={value}
              name={'to'}
              value={value}
              onClick={() => (to === value ? setTo(null) : setTo(value))}
              checked={value === to}
            />
          ))}
      </div>

      <div data-testid="minimumPassenger">
        <h2>Minimum Passenger</h2>
        {minimumPassenger &&
          minimumPassenger.map(value => (
            <Checkbox
              key={value}
              name={'minimumPassenger'}
              value={value}
              onClick={() =>
                minPassenger === value
                  ? setMinPassenger(null)
                  : setMinPassenger(value)
              }
              checked={value === minPassenger}
            />
          ))}
      </div>

      <Button
        id="request-submit-button"
        onClick={onButtonClickHandler}
        children="Carpool Request"
      />
    </RequestBlock>
  );
}

export default Request;
