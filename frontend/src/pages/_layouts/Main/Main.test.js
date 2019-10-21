import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Main from './Main';

describe('<Main />', () => {
  it('SHOULD match with snapshoot', async () => {
    const { container } = render(
      <Main>
        <div>Page</div>
      </Main>,
    );
    expect(container).toMatchSnapshot();
  });
});
