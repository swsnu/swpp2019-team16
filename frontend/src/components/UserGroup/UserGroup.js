import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../common/Heading/Heading';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';

const UserGroupBlock = styled.div``;

UserGroup.propTypes = {
  onClick: PropTypes.func,
  googleMap: PropTypes.object,
  driverInfo: PropTypes.string.isRequired,
};

function UserGroup({ onClick, googleMap, driverInfo }) {
  return (
    <UserGroupBlock>
      <Container fixed children={<Heading title="My Group" />} />
      <Container>
        <Typography variant="h5">This is where Google Map will be</Typography>
        {googleMap}
      </Container>
      <Container>
        <Typography variant="h5">Driver Info:</Typography>
        {driverInfo}
      </Container>
      <Container>
        <Typography variant="h5">Time left until departure:</Typography>
      </Container>
      <Container maxwidth="sm">
        <Button
          variant="contained"
          onClick={onClick}
          children="On Taxi"
          fullwidth="false"
        />
      </Container>
    </UserGroupBlock>
  );
}

export default UserGroup;
