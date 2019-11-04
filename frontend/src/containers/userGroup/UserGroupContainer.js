import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserGroup from '../../components/UserGroup/UserGroup';
import { withRouter } from 'react-router-dom';
import { notifyDriverLocation, onTaxi } from '../../modules/group/group';

// todo: need to send Google Map API as props
// todo: need to send driver info as props
// current state : group has been formed 


function UserGroupContainer() {
    const dispatch = useDispatch();
    const  group  = useSelector(
        group => ({ 
            group: group.group,
        }));    
    
    const onClickOnTaxi = useCallback(        
        id => dispatch(onTaxi(id)),
        [dispatch],
    );
    // group.driver is currently null
    // so will use temporary driver info
    const driverInfo = 'Name: mockDriver, Vehicle : BMW, Plate No. : 01A 1234';
    return (
        <UserGroup 
            onClick={onClickOnTaxi} 
            driverInfo={driverInfo} 
        />
    );
}
export default withRouter(UserGroupContainer);