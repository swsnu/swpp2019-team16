import React from 'react';
import { render } from '@testing-library/react';
import CarpoolRequestSection from './CarpoolRequestSection';
import { fromLocationList, toLocationList } from '../../../types/location';
import { mockRider } from '../../../types/__mock__/user';

jest.mock('@fullpage/react-fullpage', () => ({ children }) => (
  <div>{children}</div>
));

describe('<CarpoolRequestSection />', () => {
  it('SHOULD match with snapshot WHEN all data in', () => {
    const { container } = render(
      <CarpoolRequestSection
        user={mockRider}
        fromLocationList={fromLocationList}
        toLocationList={toLocationList}
        minimumPassengerList={['2', '3', '4']}
        onCarpoolRequest={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
