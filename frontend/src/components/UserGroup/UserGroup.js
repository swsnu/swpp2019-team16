import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../common/Heading/Heading';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const UserGroupBlock = styled.div``;

UserGroup.propTypes = {
  group: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  googleMap: PropTypes.object.isRequired,
  driverInfo: PropTypes.object.isRequired,
};

function UserGroup({ group, onClick, googleMap, driverInfo }) {
  const name = driverInfo.Name;
  const vehicle = driverInfo.Vehicle;
  const plate = driverInfo.Plate;
  const map = googleMap.map;
  const riders = group.map(value => '[ ' + value + ' ] ');

  return (
    <UserGroupBlock>
      <Container fixed children={<Heading title="My Group" />} />
      <Container maxwidth="false">
        <Card>
          <CardContent>
            <Typography align="center" variant="h5">
              This is where {map} will be
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Container fixed>
        <Typography variant="h4">Driver Info</Typography>
        <Typography variant="h5">Name: {name}</Typography>
        <Typography variant="h5">Vehicle: {vehicle}</Typography>
        <Typography variant="h5">Plate No.: {plate}</Typography>
      </Container>
      <Container fixed>
        <Typography variant="h4">Group Info</Typography>
        <Typography variant="h5">Riders: {riders} </Typography>
      </Container>
      <Container fixed>
        <Typography variant="h4">Time left until departure: 3:00 </Typography>
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
