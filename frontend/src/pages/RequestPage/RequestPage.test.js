import React from 'react';
import RequestPage from './RequestPage';
import { render, fireEvent } from '@testing-library/react';

describe('<RequestPage />', () => {
    it('SHOULD match with snapshot', async () => {
        const { container } = render(
            <RequestPage />                
        );
        expect(container).toMatchSnapshot();
    });
});