import React from 'react';
import { render } from '@testing-library/react';
import FromSection from './FromSection';
import { fromLocationList } from '../../../types/location';

describe('<FromSection />', () => {
  it('should match with snapshot - default', async () => {
    const { container } = render(
      <FromSection
        fromList={fromLocationList}
        onClickFrom={() => {}}
        selectedFrom={fromLocationList[0]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot - when no selected location', async () => {
    const { container } = render(
      <FromSection
        fromList={fromLocationList}
        onClickFrom={() => {}}
        selectedFrom={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
