import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { UserPropsTypes } from '../../../types/user';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

RiderList.propTypes = {
  riders: PropTypes.arrayOf(UserPropsTypes),
  onTaxiRidersList: PropTypes.arrayOf(
    PropTypes.shape({
      riderId: PropTypes.number,
    }),
  ),
};
function RiderList({ riders, onTaxiRidersList }) {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {riders &&
        riders.map(rider => {
          return (
            <ListItem key={rider.user.id} button>
              <ListItemAvatar>
                <AccountCircle />
              </ListItemAvatar>
              <ListItemText
                id={rider.user.id}
                primary={
                  <Typography variant={'h4'}>{rider.user.email}</Typography>
                }
              />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={() => {}}
                  checked={
                    onTaxiRidersList &&
                    onTaxiRidersList
                      .map(rider => rider.riderId)
                      .includes(rider.id)
                  }
                  disabled={
                    onTaxiRidersList &&
                    !onTaxiRidersList
                      .map(rider => rider.riderId)
                      .includes(rider.id)
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
    </List>
  );
}

export default RiderList;
