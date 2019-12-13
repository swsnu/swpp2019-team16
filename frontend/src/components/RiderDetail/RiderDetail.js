import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const RiderDetailBlock = styled.div``;

RiderDetail.propTypes = {
  //user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

function RiderDetail({ group }) {
  return (
    <RiderDetailBlock>
      <Typography variant={'body1'}>From: {group.from}</Typography>
      <Typography variant={'body1'}>To: {group.to}</Typography>
    </RiderDetailBlock>
  );
}
export default RiderDetail;
