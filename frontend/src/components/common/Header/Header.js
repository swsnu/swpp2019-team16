import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import ButtonMaterial from '../Button';

export const HEADER_HEIGHT = '64px';

HeaderMaterial.propTypes = {
  auth: PropTypes.object,
  onClickLogo: PropTypes.func,
  onClickLogout: PropTypes.func,
  onClickPoint: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    zIndex: theme.zIndex.high,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderMaterial({
  auth,
  onClickLogo,
  onClickLogout,
  onClickChargePoint,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const onClickClose = () => {
    setAnchorEl(null);
  };

  const onClickMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography
          variant="h4"
          className={classes.title}
          onClick={onClickLogo}
        >
          Ya-Ta!
        </Typography>
        {auth === null ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onClickMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={onClickClose}
            >
              <MenuItem onClick={onClickChargePoint}>Charge point</MenuItem>
              <MenuItem onClick={onClickLogout}>Log out</MenuItem>
            </Menu>
          </div>
        ) : (
          <ButtonMaterial variant={'text'}>Log In</ButtonMaterial>
        )}
      </Toolbar>
    </div>
  );
}
