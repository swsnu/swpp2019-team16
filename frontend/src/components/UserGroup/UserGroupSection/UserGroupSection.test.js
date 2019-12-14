import React from 'react';
import { render } from '@testing-library/react';
import UserGroupSection from './UserGroupSection';
import { mockRider } from '../../../types/__mock__/user';
import { mockGroup } from '../../../types/__mock__/group';

describe('<UserGroup />', () => {
  it('SHOULD match with snapshot WHEN all data in', async () => {
    const { container } = render(
      <UserGroupSection
        user={mockRider}
        group={mockGroup}
        onTaxiRidersList={[]}
        onClickOnTaxi={() => {}}
        onClickGoTaxi={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
