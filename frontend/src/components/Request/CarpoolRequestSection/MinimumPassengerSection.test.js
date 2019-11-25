import React from 'react';
import { render } from '@testing-library/react';
import MinimumPassengerSection from './MinimumPassengerSection';

describe('<MinimumPassengerSection />', () => {
  it('should match with snapshot - default', async () => {
    const { container } = render(
      <MinimumPassengerSection
        minimumPassengerOptions={['2', '3', '4']}
        selectedMinimumPassenger={'2'}
        onClickMinimumPassenger={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot - when no selected option', async () => {
    const { container } = render(
      <MinimumPassengerSection
        minimumPassengerOptions={['2', '3', '4']}
        selectedMinimumPassenger={null}
        onClickMinimumPassenger={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
