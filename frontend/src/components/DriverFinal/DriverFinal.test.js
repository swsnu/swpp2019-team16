import React from 'react';
import { render } from '@testing-library/react';
import DriverFinal from './DriverFinal';
import { mockGroup } from 'types/__mock__/group';
import { mockDriver } from 'types/__mock__/user';

describe('<DriverFinal />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(
      <DriverFinal group={mockGroup} user={mockDriver} onClickGoToMain={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
