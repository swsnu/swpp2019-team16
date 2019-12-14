import React from 'react';
import { render } from '@testing-library/react';
import RiderFinal from './RiderFinal';
import { mockGroup } from 'types/__mock__/group';

describe('<RiderFinal />', () => {
  it('SHOULD match with snapshot', async () => {
    global.Math.floor = () => 1;
    const { container } = render(
      <RiderFinal group={mockGroup} onClickGoToMain={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
