import axios from 'axios';

// const BASE_URL = 'http://localhost:5459/api/v1';
const BASE_URL = 'https://ec2-52-66-20-174.ap-south-1.compute.amazonaws.com:5459/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
   
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
    //console.log(response.data)
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const updateData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
