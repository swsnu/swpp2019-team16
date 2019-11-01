import React from 'react';
import styled from 'styled-components'
import Button from '../common/Button/Button';
import TextInput from '../common/TextInput';

const AuthFormBlock = styled.div``;

AuthForm.propTypes = {};

function AuthForm({ form, onChange, onSubmit }) {
  return (
    <AuthFormBlock>
        <div>
        <TextInput
            label='username'
            type="text"
            id="email-input"
            name="username"
            margin='normal'
            variant='outlined'
            onChange={onChange}
            value={form.username}
        />
        </div>        
        <div>
        <TextInput
            label='password'
            type="password"
            id="pw-input"
            name="password"
            margin='normal'
            variant='outlined'
            onChange={onChange}
            value={form.password}
        />
        </div>
        <Button id="login-button" onClick={onSubmit} children='login'/>
        <Button id="signup-button" onClick={onSubmit} children='sign up'/>
    </AuthFormBlock>
  );
}

export default AuthForm;