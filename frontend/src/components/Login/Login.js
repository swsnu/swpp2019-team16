import ButtonMaterial from '../common/Button';
import HeadingMaterial from '../common/Heading';
import TextInputMaterial from '../common/TextInput';
import PropTypes from 'prop-types';
import React from 'react';

Login.propTypes = {
  onLoginRequest: PropTypes.func.isRequired,
  onRegisterRequest: PropTypes.func.isRequired,
};

function Login({ onLoginRequest, onRegisterRequest }) {
  var id = '';
  var password = '';

  const onLoginClickHandler = () => {
    if (id === '' || password === '') {
      window.alert('Please Check ID/PW!');
      return;
    }
    onLoginRequest({
      id: id,
      password: password,
    });
  };

  const onRegisterClickHandler = () => {
    onRegisterRequest();
  };

  return (
    <div className="loginPage">
      <div className="title">
        <HeadingMaterial title="Login" />
      </div>

      <div className="inputID">
        <TextInputMaterial
          label="ID"
          onChange={event => (id = event.target.value)}
        />
      </div>
      <div className="input">
        <TextInputMaterial
          label="Password"
          onChange={event => (password = event.target.value)}
        />
      </div>

      <span className="loginButton">
        <ButtonMaterial
          children="Login"
          variant="contained"
          color="primary"
          onClick={onLoginClickHandler}
        />
      </span>

      <span>
        <ButtonMaterial
          children="Register"
          variant="contained"
          color="secondary"
          onClick={onRegisterClickHandler}
        />
      </span>
    </div>
  );
}
export default Login;
