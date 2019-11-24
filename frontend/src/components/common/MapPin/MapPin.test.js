import React from 'react';
import { render } from '@testing-library/react';
import MapPin from './MapPin';

describe('<MapPin />', () => {
  it('should match with snapshot - default', async () => {
    const { container } = render(
      <MapPin
        lat={37.480126}
        lng={126.952436}
      />
    );
    expect(container).toMatchSnapshot();
  });
});