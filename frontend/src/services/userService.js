import axios from "axios";

//const API = "http://localhost:8005/api/users"; // Your backend API URL
const API = process.env.REACT_APP_API_URL;

// Get all users
export const getUsers = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Create a new user
export const createUser = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

// Update a user
export const updateUser = async (id, data) => {
  const res = await axios.patch(`${API}/${id}`, data);
  return res.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};