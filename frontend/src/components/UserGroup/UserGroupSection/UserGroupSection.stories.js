import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import UserGroupSection from './UserGroupSection';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/theme';
import { CssBaseline } from '@material-ui/core';
import { mockGroup } from '../../../types/__mock__/group';
import { mockRider } from '../../../types/__mock__/user';

storiesOf('UserGroup/UserGroupSection', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('default', () => (
    <UserGroupSection
      user={mockRider}
      group={mockGroup}
      onCarpoolRequest={() => {}}
      googleMap={{}}
      driverInfo={{}}
    />
  ));
