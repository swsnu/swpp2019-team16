import React from 'react';
import { render } from '@testing-library/react';
import RequestCallSection from './RequestCallSection';
import { mockDriver } from 'types/__mock__/user';
import { mockGroup } from 'types/__mock__/group';

describe('RequestCall />', () => {
  it('SHOULD match with snapshot WHEN all data in', async () => {    
    const { container } = render(
      <RequestCallSection
        user={mockDriver}
        group={mockGroup}
        onClickRequestCall={()=>{}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
