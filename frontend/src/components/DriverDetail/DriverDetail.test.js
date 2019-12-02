import React from 'react';
import { render } from '@testing-library/react';
import DriverDetail from './DriverDetail';

describe('<DriverDetail />', () => {
  it('SHOULD match with snapshot', async () => { 
    const { container } = render(
      <DriverDetail
        groupId = {1}
        onClickConfirm={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
