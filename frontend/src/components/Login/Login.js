import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Box from '../common/Box/Box';
import Button from '../common/Button/Button';
import Typography from '@material-ui/core/Typography';

const LoginBlock = styled.div``;

Login.propTypes = {
  loginInfo: PropTypes.object.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  onClickRegister: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Login({ loginInfo, onChange, onClickLogin, onClickRegister }) {
  return (
    <LoginBlock>
      <Box>
        <Typography variant="h3">Login to Ya-Ta!</Typography>
        <Box>
          <input
            type="text"
            id="email-input"
            name="email"
            placeholder="email"
            onChange={onChange}
            value={loginInfo.email}
          />
        </Box>
        <Box>
          <input
            type="password"
            id="password-input"
            name="password"
            placeholder="password"
            onChange={onChange}
            value={loginInfo.password}
          />
        </Box>
        <Box>
          <Button
            children="Login"
            variant="contained"
            fullwidth="false"
            onClick={onClickLogin}
          />
          <Button
            children="Register"
            variant="contained"
            fullwidth="false"
            onClick={onClickRegister}
          />
        </Box>
      </Box>
    </LoginBlock>
  );
}
export default Login;
