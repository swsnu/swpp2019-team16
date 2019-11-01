import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserGroup from '../../components/userGroup/UserGroup';
import { withRouter } from 'react-router-dom';


// todo: need to send Google Map API as props
// todo: need to send driver info as props


function UserGroupContainer() {
    // const dispatch = useDispatch();
    // const driverInfo = useSelector( state => state.driverInfo );
    return (
        <UserGroup />
    );
}
export default withRouter(UserGroupContainer);