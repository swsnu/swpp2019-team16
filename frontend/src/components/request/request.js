import React from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button/Button';
const RequestBlock = styled.div``;

Request.propTypes = {
  //TODO
};

function onCheckboxClickHandler(name, location) {
  return () => {
    var obj = document.getElementsByName(name);
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].value !== location) {
        obj[i].checked = false;
      }
    }
  };
}

function Checkbox(name, value) {
  return (
    <div className="checkbox" key={value}>
      <input
        data-testid={value}
        type="checkbox"
        name={name}
        value={value}
        onClick={onCheckboxClickHandler(name, value)}
      />
      <label>{value}</label>
    </div>
  );
}

function Request({ user, fromList, toList, minimumPassenger, onClickRequest }) {
  const onClickHandler = () => {
    let from = null,
      to = null,
      minPassenger = null;
    var obj = document.getElementsByName('From');
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].checked) {
        from = obj[i].value;
      }
    }

    obj = document.getElementsByName('To');
    for (var j = 0; j < obj.length; j++) {
      if (obj[j].checked) {
        to = obj[j].value;
      }
    }

    obj = document.getElementsByName('minimumPassenger');
    for (var k = 0; k < obj.length; k++) {
      if (obj[k].checked) {
        minPassenger = obj[k].value;
      }
    }

    if (from !== null && to !== null && minPassenger !== null) {
      onClickRequest({
        userId: user.id,
        from: from,
        to: to,
        minimumPassenger: minPassenger,
      });
    } else {
      alert('Please Check!');
    }
  };

  const fromData = fromList.map(function(location) {
    return Checkbox('From', location);
  });

  const toData = toList.map(function(location) {
    return Checkbox('To', location);
  });

  const minPassenger = minimumPassenger.map(function(num) {
    return Checkbox('minimumPassenger', num);
  });

  if (!user) {
    return null;
  }

  return (
    <RequestBlock>
      <div data-testid="from">
        <h2>From</h2>
        {fromData}
      </div>

      <div data-testid="to">
        <h2>To</h2>
        {toData}
      </div>

      <div data-testid="minimumPassenger">
        <h2>Minimum Passenger</h2>
        {minPassenger}
      </div>

      <Button
        id="request-submit-button"
        onClick={onClickHandler}
        children="Carpool Request"
      />
    </RequestBlock>
  );
}

export default Request;
