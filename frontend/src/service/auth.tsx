
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const signup = async (email:any) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email });
    return response.data;
  } catch (error:any) {
    throw error.response.data.message;
  }
};
