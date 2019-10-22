import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerBlock = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

function Container({ children }) {
  return <ContainerBlock>{children}</ContainerBlock>;
}

export default Container;
