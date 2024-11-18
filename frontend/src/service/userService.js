import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8005/api/users";

export const fetchUsers = () => axios.get(API_URL);
export const addUser = (userData) => axios.post(API_URL, userData);
export const updateUser = (id, userData) => axios.put(`${API_URL}/${id}`, userData);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
