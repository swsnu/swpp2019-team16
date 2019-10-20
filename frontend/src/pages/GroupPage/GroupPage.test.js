import React from 'react';
import GroupPage from './GroupPage';
import { render, fireEvent } from '@testing-library/react';

describe('<GroupPage />', () => {
    it('SHOULD match with snapshot', async () => {
        const { container } = render(
            <GroupPage />                
        );
        expect(container).toMatchSnapshot();
    });
});