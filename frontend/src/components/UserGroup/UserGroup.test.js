import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserGroup from './UserGroup';

describe('UserGroup />', () => {
  it('SHOULD match with snapshot', async () => {
    const driverInfo = 'mock info';

    const { container } = render(
      <UserGroup onclick={() => {}} driverInfo={driverInfo} />,
    );
    expect(container).toMatchSnapshot();
  });
});
