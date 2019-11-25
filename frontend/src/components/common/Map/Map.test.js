import React from 'react';
import { render } from '@testing-library/react';
import Map from './Map';
import MapPin from '../MapPin';

describe('<Map />', () => {
  it('should match with snapshot - default', async () => {
    const { container } = render(
      <Map
        width={'100%'}
        height={'400px'}
        center={{
          lat: 37.480126,
          lng: 126.952436,
        }}
      >
        <MapPin lat={37.480126} lng={126.952436} />
      </Map>,
    );
    expect(container).toMatchSnapshot();
  });
});
