import React from 'react';
import { render } from '@testing-library/react';
import ToSection from './ToSection';
import { toLocationList } from '../../../types/location';

describe('<ToSection />', () => {
  it('should match with snapshot - default', async () => {
    const { container } = render(
      <ToSection
        toList={toLocationList}
        onClickTo={() => {}}
        selectedTo={toLocationList[0]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot - when no selected location', async () => {
    const { container } = render(
      <ToSection
        toList={toLocationList}
        onClickTo={() => {}}
        selectedTo={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
