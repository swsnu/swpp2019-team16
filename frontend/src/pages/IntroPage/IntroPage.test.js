import React from 'react';
import IntroPage from './IntroPage';
import { render, fireEvent } from '@testing-library/react';

describe('<IntroPage />', () => {
    it('SHOULD match with snapshot', async () => {
        const { container } = render(
            <IntroPage />                
        );
        expect(container).toMatchSnapshot();
    });
});