import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const ProfilePage = () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

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
      const response = await axios.put(
        `http://localhost:10000/api/bookings/${editingBooking._id}`,
        editingBooking
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
        <div className="flex gap-4 text-xl">
          <span className="font-semibold">User Name</span>
          <span>{username}</span>
        </div>
        <div className="flex gap-4 text-xl">
          <span className="font-semibold">User Email</span>
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
                      className="text-blue-700 hover:text-blue-800 border-2 border-blue-700 rounded-lg px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-700 hover:text-red-800 border-red-700 border-2 rounded-lg px-2 py-1"
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
              <div>
                <label>
                  Restaurant Name:
                  <input
                    type="text"
                    value={editingBooking.restaurantName}
                    onChange={(e) =>
                      setEditingBooking((prev) => ({
                        ...prev,
                        restaurantName: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Booking Date:
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
              <div>
                <label>
                  Party Size:
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
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditingBooking(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
