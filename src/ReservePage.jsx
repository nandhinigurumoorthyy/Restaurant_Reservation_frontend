import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import restaurantData from "./Restaurant.json";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const ReservePage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    partySize: "",
    partyTime: "Morning",
    contact: "",
  });

  const [todayDate, setTodayDate] = useState("");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);

    const foundRestaurant = restaurantData.find(
      (rst) => rst.id === parseInt(restaurantId, 10)
    );
    setRestaurant(foundRestaurant);
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://restaurant-reservation-backend-a4q3.onrender.com/restaurants/${restaurantId}/reservepage`,
        {
          ...formData,
          restaurantId,
          username,
          email,
          restaurantName: restaurant.name,
          restaurantLocation: restaurant.location,
        },
        { withCredentials: true }
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

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_hoj1WmskuaDPIN",
      amount: 2000,
      description: "Reservation Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `https://restaurant-reservation-backend-a4q3.onrender.com/restaurants/${restaurantId}/reservepage/api/payment/verify`;
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: { color: "#3399cc" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = `https://restaurant-reservation-backend-a4q3.onrender.com/restaurants/${restaurantId}/reservepage/api/payment/orders`;
      const { data } = await axios.post(orderUrl, { amount: 2000 });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!restaurant) {
    return (
      <div className="flex h-screen items-center justify-center font-mono text-4xl font-semibold">
        Restaurant not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pl-4 pr-4 sm:pl-6 sm:pr-4 md:pl-14 md:pr-14 lg:pl-14 lg:pr-14 pt-4 pb-16">
        <div className="text-center mx-auto mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">🍽️ Make a Reservation</h1>
          <p className="text-lg italic mt-1">Secure your spot and enjoy a memorable meal.</p>
        </div>

        <div className="pb-4 text-lg">
          <p>👋 Welcome, <span className="font-semibold">{username || "Guest"}</span>!</p>
          <p>Fill out the details below to secure your dining experience.</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">🏢 Restaurant Details</h2>
          <p className="font-semibold text-lg">{restaurant.name}</p>
          <p className="text-lg">{restaurant.cuisine} <span className="text-gray-400">|</span> {restaurant.location}</p>
        </div>

        <p className="text-lg font-semibold mt-2">📅 Reservation Details</p>

        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label htmlFor="date" className="text-lg font-medium min-w-[140px]">Reservation Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border-2 rounded-lg p-2 w-full md:w-64"
              min={todayDate}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label htmlFor="partySize" className="text-lg font-medium min-w-[140px]">Party Size</label>
            <input
              type="number"
              id="partySize"
              name="partySize"
              value={formData.partySize}
              onChange={handleChange}
              className="border-2 rounded-lg p-2 w-full md:w-64"
              required
              min="1"
              placeholder="min:1, max:100"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label htmlFor="partyTime" className="text-lg font-medium min-w-[140px]">Party Time</label>
            <select
              id="partyTime"
              name="partyTime"
              value={formData.partyTime}
              onChange={handleChange}
              className="border-2 rounded-lg p-2 w-full md:w-64"
              required
            >
              <option value="Morning">Morning (10AM - 12PM)</option>
              <option value="Lunch">Lunch (1PM - 3PM)</option>
              <option value="Evening">Evening (6PM - 8PM)</option>
              <option value="Dinner">Dinner (8PM - 10PM)</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label htmlFor="contact" className="text-lg font-medium min-w-[140px]">Contact Number</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="border-2 rounded-lg p-2 w-full md:w-64"
              placeholder="+91 91234 56789"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="bg-pink-950 text-white px-6 py-2 rounded-xl hover:bg-pink-800 hover:scale-105 transition-all duration-300 w-full md:w-auto"
            >
              Confirm Reservation
            </button>
            <button
              type="button"
              onClick={handlePayment}
              className="bg-pink-950 text-white px-6 py-2 rounded-xl hover:bg-pink-800 hover:scale-105 transition-all duration-300 w-full md:w-auto"
            >
              Pay an advance to secure your booking
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ReservePage;
