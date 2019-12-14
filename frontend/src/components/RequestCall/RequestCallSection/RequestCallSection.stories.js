import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import RequestCallSection from './RequestCallSection';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/theme';
import { CssBaseline } from '@material-ui/core';
import { mockDriver } from '../../../types/__mock__/user';

storiesOf('RequestCall/RequestCallSection', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('default', () => (
    <RequestCallSection
      groupId={1}
      user={mockDriver}
      fromLocation={'SNU Station'}
      toLocation={'301 Building'}
      onClickRequestCall={() => {}}
    />
  ));
