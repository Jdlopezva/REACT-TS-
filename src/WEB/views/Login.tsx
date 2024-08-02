import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import login from '../../API/request/LoginRequest';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [debugUsers, setDebugUsers] = useState<any>(null);
  const [verifyTokenResult, setVerifyTokenResult] = useState<any>(null);
  const [registerResult, setRegisterResult] = useState<any>(null);
  const [loginResult, setLoginResult] = useState<any>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(user, password);
  };

  const handleDebugGetUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3009/api/seguridad/debuggetusers');
      console.log('Debug GET Users Response:', response.data);
      setDebugUsers(response.data);
    } catch (error) {
      console.error('Error fetching debug users:', error);
    }
  };

  const handleVerifyToken = async () => {
    const token = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lMDIiLCJpcCI6Ijo6MSIsImlhdCI6MTcyMjUyMzAyMCwiZXhwIjoxNzIyNTQ0NjIwfQ.JPOZDCT2OtAOCe73oH6C4dEjNEiYwZDid0x0CtovwE54s4fsYBXBwTJEbIxIdJvMRCyTPbMLyzSytwLW_QpWEA";
    try {
      const response = await axios.post('http://localhost:3009/api/seguridad/debugverifytoken', { token });
      console.log('Verify Token Response:', response.data);
      setVerifyTokenResult(response.data);
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  const handleRegister = async () => {
    const registerData = {
      username: "username07",
      password: "7Password"
    };
    try {
      const response = await axios.post('http://localhost:3009/api/seguridad/register', registerData);
      console.log('Register Response:', response.data);
      setRegisterResult(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async () => {
    // try {
    //   const response = await axios.post(
    //     'http://localhost:3009/api/seguridad/login',
    //     {},
    //     {
    //         auth: {
    //           username: 'username02',
    //           password: '1Password'
    //         }  
    //     }
    //   );
    //   console.log('Login Response:', response.data);
    //   setLoginResult(response.data);
    // } catch (error) {
    //   console.error('Error logging in user:', error);
    // }
const username = 'username07';
const password = '7Password';

// Base64 encode the username and password
const token = btoa(`${username}:${password}`);

// Configure the Axios request
const config = {

  headers: {
    'Authorization': `Basic ${token}`,
  }
};

// Make the Axios POST request
axios.post('http://localhost:3009/api/seguridad/login', {}, config)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">User:</label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleDebugGetUsers}>Get Debug Users</button>
      <button onClick={handleVerifyToken}>Verify Token</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      {debugUsers && (
        <div>
          <h2>Debug Users</h2>
          <pre>{JSON.stringify(debugUsers, null, 2)}</pre>
        </div>
      )}
      {verifyTokenResult && (
        <div>
          <h2>Verify Token Result</h2>
          <pre>{JSON.stringify(verifyTokenResult, null, 2)}</pre>
        </div>
      )}
      {registerResult && (
        <div>
          <h2>Register Result</h2>
          <pre>{JSON.stringify(registerResult, null, 2)}</pre>
        </div>
      )}
      {loginResult && (
        <div>
          <h2>Login Result</h2>
          <pre>{JSON.stringify(loginResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Login;
