import React from 'react';
import styled from 'styled-components'
import Heading from '../common/Heading/Heading';
import Container from '../common/Container/Container';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';

const UserGroupBlock = styled.div``;

function UserGroup({onClick, googleMap, driverInfo}) {
    return (
        <UserGroupBlock>
            <Container fixed>
                <Heading title='My Group'/>
            </Container>
            <Container fixed>
                <Typography variant='h5' title='Google Map'>
                    Google Map
                </Typography>
            </Container>
            <Container fixed>
                <Typography variant='h5' title='Google Map'>
                    Driver Info
                </Typography>
            </Container>
            <Container fixed>
                <Typography variant='h5' title='Google Map'>
                    Time left until departure:
                </Typography>
            </Container>
            <Container fixed>
                <Button 
                variant='contained'
                onClick={onClick} 
                children='On Taxi'
                />
            </Container>
        </UserGroupBlock>
    );
}

export default UserGroup;