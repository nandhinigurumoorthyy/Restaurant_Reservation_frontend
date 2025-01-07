import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:10000/api/bookings",
          {
            params: { email },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchBookings();
    }
  }, [email]);

  //handle logout
  const handleLogout = async () => {
    try {
      // Example: Clear session or localStorage (if required)
      localStorage.removeItem("username");
      localStorage.removeItem("email");

      // Redirect after successful logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // You can display an error message to the user if needed
    }
  };

  // Handle delete booking
  const handleDelete = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:10000/api/bookings/${bookingId}`);
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        alert("Booking deleted successfully!");
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  // Handle edit booking
  const handleEdit = (booking) => {
    setEditingBooking(booking); // Set the selected booking for editing
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { partySize, date, partyTime } = editingBooking;
      const response = await axios.put(
        `http://localhost:10000/api/bookings/${editingBooking._id}`,
        { partySize, date, partyTime }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === editingBooking._id ? response.data : booking
        )
      );
      setEditingBooking(null);
      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-full mx-4 px-4 pt-3 font-serif">
        <figure className="flex items-center justify-center pt-2">
          <img
            className="w-80"
            src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-500.gif"
            alt=""
          />
        </figure>
        <div className="flex gap-4 text-xl">
          <span className="font-semibold">User Name - </span>
          <span>{username}</span>
        </div>
        <div className="flex gap-4 text-xl">
          <span className="font-semibold">User Email - </span>
          <span>{email}</span>
        </div>

        <div className="Bookings mt-10">
          <h2 className="text-2xl font-semibold mb-4">Your Bookings:</h2>
          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length > 0 ? (
            <ul>
              {bookings.map((booking) => (
                <li key={booking._id} className="mb-4 list-disc text-xl">
                  <p>
                    <strong>Restaurant Name: </strong> {booking.restaurantName}
                  </p>
                  <p>
                    <strong>Booking Date: </strong> {booking.date}
                  </p>
                  <p>
                    <strong>Party Size: </strong> {booking.partySize}
                  </p>
                  <p>
                    <strong>Time: </strong> {booking.partyTime}
                  </p>
                  <form className="flex gap-6">
                    <button
                      type="button"
                      onClick={() => handleEdit(booking)}
                      className="text-red-700 hover:text-red-800 border-2 border-red-700 rounded-lg px-3 py-1 hover:border-gray-600 hover:bg-red-700 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-700 hover:text-red-800 border-red-700 border-2 rounded-lg px-2 py-1 hover:border-gray-600 hover:bg-red-700 hover:text-white"
                    >
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found for this email.</p>
          )}
        </div>

        {editingBooking && (
          <div className="EditBooking mt-10">
            <h2 className="text-2xl font-semibold mb-4">Edit Booking:</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">Restaurant Name: </span>
                  <span className="ml-2">{editingBooking.restaurantName}</span>
                </label>
              </div>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">Booking Date: </span>
                  <input
                    type="date"
                    value={editingBooking.date}
                    onChange={(e) =>
                      setEditingBooking((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">Party Size: </span>
                  <input
                    type="number"
                    value={editingBooking.partySize}
                    onChange={(e) =>
                      setEditingBooking((prev) => ({
                        ...prev,
                        partySize: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">Party Time: </span>
                  <select
                    value={editingBooking.partyTime}
                    onChange={(e) =>
                      setEditingBooking((prev) => ({
                        ...prev,
                        partyTime: e.target.value,
                      }))
                    }
                  >
                    <option value="Morning">Morning</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Evening">Evening</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="mt-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white mr-4 px-2 py-1 rounded-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="mt-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white mr-2 px-2 py-1 rounded-lg"
                onClick={() => setEditingBooking(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="pt-4">
          <form>
            <button
              onClick={handleLogout}
              className="text-white hover:border-2 border-red-700 border-4 px-4 text-xl py-2 rounded-xl hover:border-gray-400 bg-red-700"
            >
              LogOut
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
