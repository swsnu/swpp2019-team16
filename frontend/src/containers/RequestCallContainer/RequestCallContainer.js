import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const RequestCallContainerBlock = styled.div``;

RequestCallContainer.propTypes = {};

// TODO: need refactor
function RequestCallContainer() {
  const { group } = useSelector(({ group }) => ({
    group: group.group,
  }));

  if (!group) {
    return <div>Waiting for group to be matched...</div>;
  }
  return <RequestCallContainerBlock>Group Info</RequestCallContainerBlock>;
}

export default RequestCallContainer;
