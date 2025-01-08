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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bookingsResponse = await axios.get(
          "https://restaurant-reservation-backend-a4q3.onrender.com/api/bookings",
          { params: { email } }
        );
        setBookings(bookingsResponse.data);

        const reviewsResponse = await axios.get(
          "https://restaurant-reservation-backend-a4q3.onrender.com/api/reviews",
          { params: { email } }
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/");
  };

  // Handle delete booking
  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(
          `https://restaurant-reservation-backend-a4q3.onrender.com/api/bookings/${bookingId}`
        );
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

  // Handle delete review
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(
          `https://restaurant-reservation-backend-a4q3.onrender.com/api/reviews/${reviewId}`
        );
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        alert("Review deleted successfully!");
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Please try again.");
      }
    }
  };

  // Handle edit booking
  const handleEditBooking = (booking) => {
    setEditingBooking(booking); // Set the selected booking for editing
  };

  // Handle edit review
  const handleEditReview = (review) => {
    setEditingReview(review); // Set the selected review for editing
  };

  // Handle form submission for editing bookings
  const handleEditBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://restaurant-reservation-backend-a4q3.onrender.com/api/bookings/${editingBooking._id}`,
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

  // Handle form submission for editing reviews
  const handleEditReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const { comments, starRatings, photosLink } = editingReview;
      const response = await axios.put(
        `https://restaurant-reservation-backend-a4q3.onrender.com/api/reviews/${editingReview._id}`,
        { comments, starRatings, photosLink }
      );
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === editingReview._id ? response.data : review
        )
      );
      setEditingReview(null);
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-full mx-4 px-4 pt-3 font-serif">
        {/* User Info */}
        <figure className="flex items-center justify-center pt-2">
          <img
            className="w-80"
            src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-500.gif"
            alt="User"
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

        {/* Bookings Section */}
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
                  <div className="flex gap-6">
                    <button
                      type="button"
                      onClick={() => handleEditBooking(booking)}
                      className="text-red-700 border-2 border-red-700 rounded-lg px-3 py-1 hover:border-gray-600 hover:bg-red-700 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="text-red-700 border-red-700 border-2 rounded-lg px-2 py-1 hover:border-gray-600 hover:bg-red-700 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found for this email.</p>
          )}
        </div>

        {/* Edit Booking Section */}
        {editingBooking && (
          <div className="EditBooking mt-10">
            <h2 className="text-2xl font-semibold mb-4">Edit Booking:</h2>
            <form onSubmit={handleEditBookingSubmit}>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold pr-5">Restaurant Name: </span>
                  <input
                    type="text"
                    value={editingBooking.restaurantName}
                    onChange={(e) =>
                      setEditingBooking((prev) => ({
                        ...prev,
                        restaurantName: e.target.value,
                      }))
                    }
                    className="w-full p-2 border"
                  />
                </label>
              </div>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold pr-5">Booking Date: </span>
                  <input
                    type="date"
                    value={editingBooking.date}
                    onChange={(e) =>
                      setEditingBooking((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full p-2 border"
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
              <div className="text-xl pb-3">
                <label>
                  <span className="font-semibold pr-5">Party Size:</span>
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
              <button
                type="submit"
                className="mt-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white mr-4 px-2 py-1 rounded-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="mt-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-2 py-1 rounded-lg"
                onClick={() => setEditingBooking(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Reviews Section */}
        <div className="Review mt-10">
          <h2 className="text-2xl font-semibold mb-4">Your Reviews:</h2>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review._id} className="mb-4 list-disc text-xl">
                  <p>
                    <strong>Restaurant Name: </strong> {review.restaurantName}
                  </p>
                  <p>
                    <strong>Restaurant Location: </strong>{" "}
                    {review.restaurantLocation}
                  </p>
                  <p>
                    <strong>Comments: </strong> {review.comments}
                  </p>
                  <figure>
                    <img
                      src={review.photosLink}
                      alt="review image"
                      className="w-80 h-72"
                    />
                  </figure>
                  <p>
                    <strong>Star Rating: </strong> {review.starRatings}{" "}
                  ⭐
                  </p>
                  <div className="flex gap-6">
                    <button
                      type="button"
                      onClick={() => handleEditReview(review)}
                      className="text-red-700 border-2 border-red-700 rounded-lg px-3 py-1 hover:border-gray-600 hover:bg-red-700 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-700 border-red-700 border-2 rounded-lg px-2 py-1 hover:border-gray-600 hover:bg-red-700 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found for this email.</p>
          )}
        </div>

        {/* Edit Review Section */}
        {editingReview && (
          <div className="EditReview mt-10">
            <h2 className="text-2xl font-semibold mb-4">Edit Review:</h2>
            <form onSubmit={handleEditReviewSubmit}>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">Restaurant Name: </span>
                  <span className="ml-2">{editingReview.restaurantName}</span>
                </label>
              </div>
              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">Comments: </span>
                  <textarea
                    value={editingReview.comments}
                    onChange={(e) =>
                      setEditingReview((prev) => ({
                        ...prev,
                        comments: e.target.value,
                      }))
                    }
                    rows="3"
                    className="w-full p-2 border"
                  />
                </label>
              </div>

              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">photosLink: </span>
                  <input
                    type="url"
                    value={editingReview.photosLink}
                    onChange={(e) =>
                      setEditingReview((prev) => ({
                        ...prev,
                        photosLink: e.target.value,
                      }))
                    }
                    rows="3"
                    className="w-full p-2 border"
                  />
                </label>
              </div>

              <div className="pb-2">
                <label className="text-xl">
                  <span className="font-semibold">Star Rating: </span>
                  <input
                    type="number"
                    value={editingReview.starRatings}
                    onChange={(e) =>
                      setEditingReview((prev) => ({
                        ...prev,
                        starRatings: e.target.value,
                      }))
                    }
                    min="1"
                    max="5"
                    className="w-20 p-1 border"
                  />
            
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
                className="mt-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-2 py-1 rounded-lg"
                onClick={() => setEditingReview(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Logout Section */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="text-white hover:border-2 border-red-700 border-4 px-4 text-xl py-2 rounded-xl hover:border-gray-400 bg-red-700"
          >
            LogOut
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
