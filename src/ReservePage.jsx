import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import restaurantData from "./Restaurant.json"; // or fetch it from an API
import Navbar from "./Navbar";
import Footer from "./Footer";

const ReservePage = () => {
  const { restaurantId } = useParams(); // Get restaurantId from the URL
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [username, setUsername] = useState("John Doe"); // Example: Fetch from authentication or localStorage
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    partySize: "",
  });

  const [todayDate, setTodayDate] = useState(""); // For today's date

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
    setTodayDate(today);

    const foundRestaurant = restaurantData.find(
      (rst) => rst.id === parseInt(restaurantId, 10)
    );
    setRestaurant(foundRestaurant);
  }, [restaurantId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, like sending reservation data to an API
    console.log("Reservation details", formData);
    alert(`Reservation made successfully!! Check your profile ${username}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFromDateChange = (e) => {
    const selectedFromDate = e.target.value;
    setFormData((prev) => ({
      ...prev,
      fromDate: selectedFromDate,
    }));

    // Ensure 'to date' can't be before 'from date'
    if (selectedFromDate > formData.toDate && formData.toDate !== "") {
      setFormData((prev) => ({
        ...prev,
        toDate: "", // Reset toDate if it's earlier than fromDate
      }));
    }
  };

  const handleToDateChange = (e) => {
    const selectedToDate = e.target.value;
    setFormData((prev) => ({
      ...prev,
      toDate: selectedToDate,
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
      <div className="px-4 mx-4 pt-5">
        <h1 className="text-3xl font-bold mb-5">Make a Reservation</h1>
        <div className="mb-3">
          <h2 className="text-2xl font-semibold">Restaurant Details</h2>
          <p className="text-xl">{restaurant.name}</p>
          <p className="text-gray-600">{restaurant.cuisine}</p>
          <p className="text-xl">{restaurant.location}</p>
        </div>
        {/* Show Username */}
        <div className="flex items-center gap-2 pb-4">
          <span className="font-semibold text-xl">Username:</span>
          <span className="text-xl font-medium">{username}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fromDate" className="block text-lg font-medium">
              From Date:
            </label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleFromDateChange}
              className="border-2 p-2 w-full"
              min={todayDate} // Set minimum date to today
              required
            />
          </div>

          <div>
            <label htmlFor="toDate" className="block text-lg font-medium">
              To Date:
            </label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formData.toDate}
              onChange={handleToDateChange}
              className="border-2 p-2 w-full"
              min={formData.fromDate || todayDate} // Set minimum date to the fromDate (or today if fromDate is not selected)
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
              min="1"
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
