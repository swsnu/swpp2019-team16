import React from 'react';
import { render } from '@testing-library/react';
import RiderDetail from './RiderDetail';

describe('<RiderDetail />', () => {
  it('SHOULD match with snapshot', async () => { 
    const { container } = render(
      <RiderDetail
        group={{from:"from", to:"to"}}
        onClickConfirm={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
