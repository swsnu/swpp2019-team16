import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import Map from './Map';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../lib/styles/theme';
import { CssBaseline } from '@material-ui/core';
import MapPin from '../MapPin/MapPin';

storiesOf('common/Map', module)
  .addDecorator(story => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {story()}
      </ThemeProvider>
    </BrowserRouter>
  ))
  .add('default', () => (
    <Map
      width={"100%"}
      height={"400px"}
      center={{
        lat: 37.480126,
        lng: 126.952436,
      }}
    >
      <MapPin
        lat={37.480126}
        lng={126.952436}
      />
    </Map>
  ));