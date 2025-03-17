import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "../src/images/cont1.jpg";
import img2 from "../src/images/cont2.jpg";
import img3 from "../src/images/cont3.jpg";
import img4 from "../src/images/cont4.jpg";
import img5 from "../src/images/cont5.jpg";
import "./index.css";

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
    <div className=" min-h-screen" style={{ backgroundColor: "#341920" }} >
      <Navbar />
      <div className="text-white pb-10 ">
        <div className="overflow-hidden w-full" >

          {/* Image-content */}
          <div className="relative w-full overflow-hidden py-10">
            <div className="flex gap-4 animate-marquee">
              {/* Images set (duplicated for seamless effect) */}
              {[img1, img2, img3, img4, img5, img1, img2, img3, img4, img5].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-40 h-32 sm:w-52 sm:h-40 md:w-64 md:h-48 lg:w-80 lg:h-72 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>


        </div>
        <div className="pl-4 pr-4 sm:pl-6 sm:pr-4 md:pl-14 md:pr-14 lg:pl-14 lg:pr-14">

          {/* User Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <div>
              <div className="flex flex-wrap gap-2 text-base sm:text-lg">
                <span className="font-semibold">Name:</span>
                <span>{username}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-base sm:text-lg">
                <span className="font-semibold">Email:</span>
                <span>{email}</span>
              </div>
            </div>

            {/* Logout Section */}
            <div>
              <button
                onClick={handleLogout}
                className="bg-pink-950 hover:scale-105 text-white px-6 py-2 rounded-xl hover:bg-pink-800 transition-all duration-300 w-full sm:w-auto"
              >
                LogOut
              </button>
            </div>
          </div>



          {/* Bookings Section */}
          <div className="Bookings mt-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">📅 Your Bookings</h2>
            {loading ? (
              <p>Loading bookings...</p>
            ) : bookings.length > 0 ? (
              <ul className="space-y-6">
                {bookings.map((booking) => (
                  <li key={booking._id} className="p-4 rounded-lg shadow-md">
                    <p className="font-semibold text-lg sm:text-xl">{booking.restaurantName}</p>
                    <p className="text-base sm:text-lg mt-1">
                      Date: {booking.date.slice(0, 10)}{" "}
                      <span className="text-gray-500">|</span> Party Size: {booking.partySize}{" "}
                      <span className="text-gray-500">|</span> Time: {booking.partyTime}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => handleEditBooking(booking)}
                        className="bg-pink-950 text-white px-5 py-2 rounded-xl hover:bg-pink-800 transition-all duration-300 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="bg-pink-950 text-white px-5 py-2 rounded-xl hover:bg-pink-800 transition-all duration-300 w-full sm:w-auto"
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
            <div className="EditBooking mt-10 p-4 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Edit Booking</h2>
              <form onSubmit={handleEditBookingSubmit}>
                <div className="flex flex-col gap-3">
                  <p className="text-lg sm:text-xl">{editingBooking.restaurantName}</p>

                  {/* Booking Date */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-base sm:text-lg font-medium">Booking Date</label>
                    <input
                      type="date"
                      value={editingBooking.date}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="border rounded-lg px-3 py-1   w-full sm:w-60"
                    />
                  </div>

                  {/* Party Time */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-base sm:text-lg font-medium">Party Time</label>
                    <select
                      value={editingBooking.partyTime}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          partyTime: e.target.value,
                        }))
                      }
                      className="border rounded-lg px-3 py-1 w-full sm:w-60"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Evening">Evening</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>

                  {/* Party Size */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-base sm:text-lg font-medium">Party Size</label>
                    <input
                      type="number"
                      value={editingBooking.partySize}
                      onChange={(e) =>
                        setEditingBooking((prev) => ({
                          ...prev,
                          partySize: e.target.value,
                        }))
                      }
                      className="border rounded-lg px-3 py-1 w-full sm:w-60"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      type="submit"
                      className="bg-pink-950 text-white px-6 py-2 rounded-xl hover:bg-pink-800 transition-all duration-300 w-full sm:w-auto"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition-all duration-300 w-full sm:w-auto"
                      onClick={() => setEditingBooking(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}


          {/* Reviews Section */}
          <div className="Review mt-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">💬 Your Reviews</h2>
            {loading ? (
              <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
              <ul className="space-y-6">
                {reviews.map((review) => (
                  <li key={review._id} className="p-4 rounded-lg shadow-md">
                    <p className="font-semibold text-lg sm:text-xl">{review.restaurantName}</p>
                    <p className="text-base sm:text-lg text-gray-300">{review.restaurantLocation}</p>
                    <p className="mt-1 text-base sm:text-lg">
                      {review.comments} <span className="text-gray-500">|</span> {review.starRatings} ⭐
                    </p>
                    {review.photosLink && (
                      <figure className="mt-3">
                        <img
                          src={review.photosLink}
                          alt="review image"
                          className="w-full sm:w-80 h-52 object-cover rounded-lg shadow"
                        />
                      </figure>
                    )}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => handleEditReview(review)}
                        className="bg-pink-950 text-white px-5 py-2 rounded-xl hover:bg-pink-800 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review._id)}
                        className="bg-pink-950 text-white px-5 py-2 rounded-xl hover:bg-pink-800 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
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
            <div className="EditReview mt-10 p-4 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Edit Review</h2>
              <form onSubmit={handleEditReviewSubmit}>
                <div className="flex flex-col gap-3">
                  <p className="text-lg sm:text-xl">{editingReview.restaurantName}</p>

                  {/* Comments */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-base sm:text-lg font-medium">Comments</label>
                    <textarea
                      value={editingReview.comments}
                      onChange={(e) =>
                        setEditingReview((prev) => ({
                          ...prev,
                          comments: e.target.value,
                        }))
                      }
                      rows="3"
                      className="border rounded-lg px-4 py-2 w-full sm:w-60"
                      placeholder="Write your review..."
                    />
                  </div>

                  {/* Photo Link */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-base sm:text-lg font-medium">Photo Link</label>
                    <input
                      type="url"
                      value={editingReview.photosLink}
                      onChange={(e) =>
                        setEditingReview((prev) => ({
                          ...prev,
                          photosLink: e.target.value,
                        }))
                      }
                      className="border rounded-lg px-4 py-2 w-full sm:w-60"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="text-base sm:text-lg font-medium">Star Rating</label>
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
                      className="border rounded-lg px-4 py-2 w-24 sm:w-60"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      type="submit"
                      className="bg-pink-950 text-white px-6 py-2 rounded-xl hover:bg-pink-800 transition-all duration-300 w-full sm:w-auto"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition-all duration-300 w-full sm:w-auto"
                      onClick={() => setEditingReview(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
