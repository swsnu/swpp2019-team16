import React, {Component} from 'react';
import './LoginPage.css'

class LoginPage extends Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        error: '',
      };
  
      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dismissError = this.dismissError.bind(this);
    }
  
    dismissError() {
      this.setState({ error: '' });
    }
  
    handleSubmit(evt) {
      evt.preventDefault();
  
      if (!this.state.username) {
        return this.setState({ error: 'Username is required' });
      }
  
      if (!this.state.password) {
        return this.setState({ error: 'Password is required' });
      }
  
      return this.setState({ error: '' });
    }
  
    handleUserChange(e) {
      this.setState({
        username: e.target.value,
      });
    };
  
    handlePassChange(e) {
      this.setState({
        password: e.target.value,
      });
    }
  
    render() {
      
      return (

       
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            {
              this.state.error &&
              <h3 data-test="error" onClick={this.dismissError}>
                <button onClick={this.dismissError}>✖</button>
                {this.state.error}
              </h3>
            }
            <div class="form-group">
            <label>User Name</label>
            <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
            </div>
            <label>Password</label>
            <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
  
            <input type="submit" value="Log In" data-test="submit" />
          </form>
        </div>
        
      );
    }
  }
  
  export default LoginPage;
