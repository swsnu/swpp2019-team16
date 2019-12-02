import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeaderContainer from '../../../containers/common/HeaderContainer/HeaderContainer';
import theme from '../../../lib/styles/theme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { CssBaseline } from '@material-ui/core';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

function Main({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> enables lib/material-ui/theme to work */}
      <CssBaseline />
      <Root>
        <HeaderContainer />
        {children}
      </Root>
    </ThemeProvider>
  );
}

export default Main;
