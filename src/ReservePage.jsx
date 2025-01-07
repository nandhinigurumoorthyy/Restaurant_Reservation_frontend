import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import restaurantData from "./Restaurant.json"; // or fetch it from an API
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const ReservePage = () => {
  const { restaurantId } = useParams(); // Get restaurantId from the URL
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState("");
  const [formData, setFormData] = useState({
    date: "", // Only one date field now
    partySize: "",
    partyTime: "Morning", // Default value for partyTime
    contact: "", // Add contact field if needed
  });

  const [todayDate, setTodayDate] = useState(""); // For today's date

  // Fetch username and email from localStorage
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  // Debugging logs
  console.log("Username from localStorage:", username);
  console.log("Email from localStorage:", email);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
    setTodayDate(today);

    const foundRestaurant = restaurantData.find(
      (rst) => rst.id === parseInt(restaurantId, 10)
    );
    setRestaurant(foundRestaurant);

    // Debugging logs
    console.log("Restaurant ID from params:", restaurantId);
    console.log("Found restaurant data:", foundRestaurant);
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:10000/restaurants/${restaurantId}/reservepage`, // Your backend endpoint
        {
          date: formData.date, // Only send one date
          partySize: formData.partySize,
          partyTime: formData.partyTime,
          restaurantId: restaurantId, // Send restaurantId from params or state
          contact: formData.contact, // Assuming you've added the contact field in formData
          username: username, // Use username from localStorage
          email: email, // Send email
          restaurantName: restaurant.name,
          restaurantLocation: restaurant.location,
        },
        { withCredentials: true } // Include credentials (cookies) for token
      );

      console.log("Reservation response:", response.data);
      alert(`Reservation made successfully! Check your profile, ${username}`);
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert("Failed to create reservation. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!restaurant) {
    return (
      <div className="flex h-screen items-center justify-center font-mono text-4xl font-semibold">
        Restaurant not found!
      </div>
    );
  }

  return (
    <div className="h-full font-serif">
      <Navbar />
      <div className="px-4 mx-4 pt-4">
        <h1 className="text-3xl font-bold mb-4">Make a Reservation</h1>
        {/* Show Username and Email */}
        <div className="flex items-center gap-2 pb-2">
          <span className="font-semibold text-xl">User Name:</span>
          <span className="text-xl font-medium">{username || "Guest"}</span>
        </div>
        <div className="flex items-center gap-2 pb-4">
          <span className="font-semibold text-xl">User Email:</span>
          <span className="text-xl font-medium">{email || "Not Provided"}</span>
        </div>
        <div className="mb-3">
          <h2 className="text-2xl font-semibold">Restaurant Details</h2>
          <p className="text-xl">{restaurant.name}</p>
          <p className="text-gray-600">{restaurant.cuisine}</p>
          <p className="text-xl">{restaurant.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-lg font-medium">
              Reservation Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border-2 p-2 w-full"
              min={todayDate} // Set minimum date to today
              required
            />
          </div>

          <div>
            <label htmlFor="partySize" className="block text-lg font-medium">
              Party Size:
            </label>
            <input
              type="number"
              id="partySize"
              name="partySize"
              value={formData.partySize}
              onChange={handleChange}
              className="border-2 p-2 w-full"
              required
              placeholder="min:1, max:100"
              min="1"
            />
          </div>

          <div>
            <label htmlFor="partyTime" className="block text-lg font-medium">
              Party Time:
            </label>
            <select
              id="partyTime"
              name="partyTime"
              value={formData.partyTime}
              onChange={handleChange}
              className="border-2 p-2 w-full"
              required
            >
              <option value="Morning">Morning (10AM - 12PM)</option>
              <option value="Lunch">Lunch (1PM - 3PM)</option>
              <option value="Evening">Evening(6PM - 8PM)</option>
              <option value="Dinner">Dinner(8PM - 10PM)</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact" className="block text-lg font-medium">
              Contact Number:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="border-2 p-2 w-full"
              required
              placeholder="Your contact number"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-red-700 text-white p-3 rounded-xl"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ReservePage;
