import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../../lib/styles/theme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { CssBaseline } from '@material-ui/core';

const Root = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${theme.palette.background.default};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

FullWidth.propTypes = {
  children: PropTypes.node.isRequired,
};

function FullWidth({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> enables lib/material-ui/theme to work */}
      <CssBaseline />
      <Root>{children}</Root>
    </ThemeProvider>
  );
}

export default FullWidth;
