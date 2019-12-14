import React from 'react';
import { render } from '@testing-library/react';
import DriverFinal from './DriverFinal';

describe('<DriverFinal />', () => {
  it('SHOULD match with snapshot', async () => {
    const { container } = render(
      <DriverFinal earning={5000} point={50000} onClickGoToMain={() => {}} />,
    );
    expect(container).toMatchSnapshot();
  });
});
