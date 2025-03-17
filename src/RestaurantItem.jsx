import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import restaurantData from "./Restaurant.json";
import Navbar from "./Navbar";
import Footer from "./Footer";

const RestaurantItem = () => {
  const [restaurant, setRestaurant] = useState();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantData = () => {
      try {
        const foundRestaurant = restaurantData.find(
          (rst) => rst.id === parseInt(restaurantId, 10)
        );
        setRestaurant(foundRestaurant || null);
      } catch (err) {
        console.error("Error fetching restaurant ", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://restaurant-reservation-backend-a4q3.onrender.com/apirst/reviews/${encodeURIComponent(
            restaurant?.name
          )}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews ", err);
      }
    };

    if (restaurant) fetchReviews();
    else fetchRestaurantData();

    setLoading(false);
  }, [restaurantId, restaurant?.name]);

  const handleReserveClick = () => navigate(`/restaurants/${restaurantId}/reservepage`);
  const handleWriteReviewClick = () => navigate(`/restaurants/${restaurantId}/review`);

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center font-mono text-4xl font-semibold">
        <img src="https://i.gifer.com/origin/ba/ba60429a7e91ea8f097537268b095a47_w200.gif" alt="Loading" />
        <div>Loading...</div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="flex h-screen items-center justify-center font-mono text-4xl font-semibold">Restaurant not found!</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pl-2 pr-2 md:pl-14 md:pr-14 pb-5 mb-6 ">

        {/* Title Card */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <img src={restaurant.title_card_img} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-800 bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
            <h1 className="text-3xl md:text-4xl font-bold">{restaurant.name}</h1>
            <p className="mt-2 text-sm md:text-lg text-center">
              🍽️ {restaurant.cuisine} | ⭐ {restaurant.rating} | {restaurant.priceRange} | 📍 {restaurant.location}
            </p>
            <p className="mt-2 text-xs md:text-lg italic text-gray-300 text-center">{restaurant.description}</p>
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              <button onClick={handleReserveClick} className="bg-pink-950 text-white px-4 py-2 rounded-lg hover:bg-pink-800 transition">
                Reserve Now !!!
              </button>
              <button onClick={handleWriteReviewClick} className="bg-pink-950 text-white px-4 py-2 rounded-lg hover:bg-pink-800 transition">
                Review Now !!!
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 pt-5">

          {/* About Us */}
          <div>
            <h4 className="font-semibold text-xl text-pink-950 mb-4">📖 About Us</h4>
            <div className="flex flex-wrap gap-6 justify-between">
              {["ambiance", "features", "dietaryRestrictions"].map((key) => (
                <div key={key} className="flex-1 min-w-[250px]">
                  <span className="font-semibold text-lg text-pink-900 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <ul className="pl-5 space-y-2 mt-2">
                    {restaurant[key]?.map((item, index) => (
                      <li key={index} className="text-gray-700 text-base">- {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h4 className="font-semibold text-xl text-pink-950 mb-4">📸 Gallery</h4>
            <div className="flex gap-4 overflow-x-auto py-4">
              {restaurant.photos?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden">
                  <img src={image} alt={`Gallery ${index}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-2xl text-pink-950 mb-4">🧾 Menu</h4>
            <div className="space-y-2 max-w-full sm:max-w-md">
              {restaurant.menus?.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-800 border-b pb-2">
                  <span>{item.dish}</span>
                  <span className="text-gray-600">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hours of Operation */}
          <div>
            <h4 className="font-semibold text-2xl text-pink-950 mb-4">⏰ Hours of Operation</h4>
            <ul className="pl-5">
              {Object.entries(restaurant.hoursOfOperation)?.map(([day, hours], index) => (
                <li key={index} className="text-lg mb-1">{day}: {hours}</li>
              ))}
            </ul>
          </div>

          {/* Helpful Resources */}
          <div>
            <h4 className="font-semibold text-2xl text-pink-950 mb-4">📚 Helpful Resources</h4>
            <a href={restaurant.link} className="text-sky-600 underline break-words">{restaurant.link}</a>
          </div>

          {/* Reviews */}
          <div>
            <h4 className="font-semibold text-2xl text-pink-950 mb-4">💬 Reviews</h4>
            <div className="space-y-6">
              {reviews.length ? reviews.map((review) => (
                <div key={review._id} className="border-b pb-4 space-y-2">
                  <p><strong>User:</strong> {review.username}</p>
                  <p><strong>Comments:</strong> {review.comments}</p>
                  <p><strong>Star Rating:</strong> {review.starRatings} ⭐</p>
                  {review.photosLink && <img src={review.photosLink} alt="Review" className="w-64 h-48 object-cover rounded" />}
                </div>
              )) : <p>No reviews found for this restaurant.</p>}
            </div>
            <div className=" mt-6">
              <button onClick={handleWriteReviewClick} className="bg-pink-950 text-white px-6 py-2 rounded-xl hover:bg-pink-800 transition">
                Write a Review
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantItem;
