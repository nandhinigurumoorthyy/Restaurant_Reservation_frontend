import axios from "axios";

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: "http://localhost:10000", // Replace with your server's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle errors
const handleError = (error) => {
  console.error("API Error:", error.response || error.message);
  throw error;
};

// Define API functions using the Axios instance
export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`/api/user/profile?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const fetchReservations = () =>
  apiClient.get("/api/reservations").catch(handleError);

export const updateReservation = (id, data) =>
  apiClient.put(`/api/reservations/${id}`, data).catch(handleError);

export const deleteReservation = (id) =>
  apiClient.delete(`/api/reservations/${id}`).catch(handleError);
