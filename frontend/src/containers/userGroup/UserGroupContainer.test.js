import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserGroupContainer from './UserGroupContainer';
import { renderWithRedux } from '../../test/utils';
import { MemoryRouter, Route } from 'react-router-dom';
import expectExport from '../../../node_modules/expect/build/index';

jest.mock('../../components/UserGroup/UserGroup', () => 
    jest.fn(props => <div></div>),
);

describe('<UserGroupContainer />', () => {
    it('SHOULD match with snapshot', async () => {
        const { container } = renderWithRedux(
            <MemoryRouter initialEntries={['/group']}>
                <Route component={UserGroupContainer} path='/group' />
            </MemoryRouter>
        );
        expectExport(container).toMatchSnapshot();
    });
});