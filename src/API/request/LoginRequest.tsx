import axios from 'axios';

const login = async (username: string, password: string) => {
  const url = 'http://127.0.0.1:3009/api/seguridad/login';
  
  try {
    const response = await axios.post(url, {}, {
      auth: {
        username,
        password
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error during the login request:', error);
  }
};

export default login;
