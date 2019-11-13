import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserGroup from './UserGroup';

describe('UserGroup />', () => {
  it('SHOULD match with snapshot WHEN all data in', async () => {
    const group = ['rider1', 'rider2', 'rider3', 'rider4'];
    const googleMap = {
      map: 'GoogleMap',
    };
    const driverInfo = {
      Name: 'MockDriver',
      Vehicle: 'BMW',
      'Plate No.': '01A 1234',
    };
    const { container } = render(
      <UserGroup
        onClick={() => {}}
        group={group}
        googleMap={googleMap}
        driverInfo={driverInfo}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
