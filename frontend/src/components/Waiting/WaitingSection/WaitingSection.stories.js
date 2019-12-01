import React from 'react';
import { storiesOf } from '@storybook/react';

import WaitingSection from './WaitingSection';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/theme';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

storiesOf('Waiting/WaitingSection', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('default', () => (
    <WaitingSection/>
  ));