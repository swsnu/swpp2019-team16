import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '../common/Button'

const RiderFinalBlock = styled.div``;

RiderFinal.propTypes = {
  group: PropTypes.object.isRequired,
};

function RiderFinal({ group, onClickGoToMain }) {

    const premiumTotalCost = Math.floor((group.totalCost * 1.2)/100)*100
    const riderFee = group.riderCost;
    const saved = premiumTotalCost - riderFee;
    return (
        <RiderFinalBlock>
            <Typography variant={'body1'}>TotalCost is {premiumTotalCost}</Typography>
            <Typography variant={'body1'}>Your fee {riderFee}</Typography>
            <Typography variant={'body1'}>You saved {saved}</Typography>
            <Button
            children="Go To Main"
            variant="contained"
            fullwidth="false"
            onClick={()=>onClickGoToMain()}
            />
        </RiderFinalBlock>
        
    );
}
export default RiderFinal;
