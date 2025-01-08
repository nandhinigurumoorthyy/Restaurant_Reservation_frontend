import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import restaurantData from "./Restaurant.json"; // Local JSON for restaurant details
import Navbar from "./Navbar";
import Footer from "./Footer";

const RestaurantItem = () => {
  const [restaurant, setRestaurant] = useState(); // Selected restaurant data
  const [reviews, setReviews] = useState([]); // Reviews for the restaurant
  const [loading, setLoading] = useState(true); // Loading state
  const { restaurantId } = useParams(); // Extract restaurantId from URL parameters
  const navigate = useNavigate();

  // Fetch restaurant details and reviews
  useEffect(() => {
    const fetchRestaurantData = () => {
      try {
        const foundRestaurant = restaurantData.find(
          (rst) => rst.id === parseInt(restaurantId, 10)
        );
        setRestaurant(foundRestaurant || null);
      } catch (err) {
        console.error("Error fetching restaurant:", err);
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
        console.error("Error fetching reviews:", err);
      }
    };

    if (restaurant) {
      fetchReviews();
    } else {
      fetchRestaurantData();
    }

    setLoading(false);
  }, [restaurantId, restaurant?.name]);

  const handleReserveClick = () => {
    navigate(`/restaurants/${restaurantId}/reservepage`);
  };

  const handleWriteReviewClick = () => {
    navigate(`/restaurants/${restaurantId}/review`);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center font-mono text-4xl font-semibold">
        <figure>
          <img
            src="https://i.gifer.com/origin/ba/ba60429a7e91ea8f097537268b095a47_w200.gif"
            alt="Loading"
          />
        </figure>
        <div>Loading...</div>
      </div>
    );
  }

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
      <div className="flex gap-12 px-4 mx-4 pt-5">
        {/* Restaurant Details */}
        <div className="flex flex-col gap-3 w-2/3">
          <h1 className="text-4xl font-semibold">{restaurant.name}</h1>
          <p className="text-gray-600 text-xl">{restaurant.cuisine}</p>
          <p className="text-xl italic">{restaurant.description}</p>
          <p className="text-xl flex gap-4">
            <span className="font-semibold">Location:</span>{" "}
            {restaurant.location}
          </p>
          <p className="flex gap-4">
            <span className="text-xl font-semibold">Price Range:</span>{" "}
            <span className="font-medium text-xl">{restaurant.priceRange}</span>
          </p>
          <p className="flex gap-4">
            <span className="text-xl font-semibold">Rating:</span>{" "}
            {restaurant.rating} ⭐
          </p>
        </div>

        {/* Restaurant Image and Actions */}
        <div className="w-1/3 flex flex-col items-center gap-4">
          <button
            onClick={handleReserveClick}
            className="w-44 bg-red-700 text-white rounded-xl px-4 py-2 hover:bg-red-800"
          >
            Reserve Now
          </button>
          <button
            onClick={handleWriteReviewClick}
            className="w-64 bg-red-700 text-white rounded-xl px-4 py-2 hover:bg-red-800"
          >
            Write a Review
          </button>
          <img
            src={restaurant.title_card_img}
            alt={restaurant.name}
            className="w-80 h-56 object-cover"
          />
        </div>
      </div>
      {/* Restaurant Additional Details */}
      <div className="px-4 mx-4 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Menu:</h2>
        <ul className="pl-5">
          {restaurant.menus?.map((item, index) => (
            <li key={index} className="flex text-xl justify-between w-96">
              <p className="flex gap-3 justify-between w-96">
                <span>{item.dish}</span>
                <span className="text-gray-600 font-semibold">
                  ₹{item.price}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Features:</h2>
        <ul className="pl-5">
          {restaurant.features?.map((feature, index) => (
            <li key={index} className="text-xl list-disc">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3 flex-col px-4 mx-4 pt-5">
        <div className="text-xl">
          <p>
            <span className="font-semibold">Ambiance:</span>
            <span className="pl-8">{restaurant.ambiance.join(", ")}</span>
          </p>
        </div>

        <div className="text-xl">
          <p>
            <span className="font-semibold">Dietary Restrictions:</span>
            <span className="pl-8">
              {restaurant.dietaryRestrictions.join(", ")}
            </span>
          </p>
        </div>

        <div className="text-xl flex gap-3 flex-wrap">
          <p className="font-semibold">Hours of Operation: </p>
          <ul className="list-outside list-disc pl-8 text-black">
            {Object.entries(restaurant.hoursOfOperation)?.map(
              ([day, hours], index) => (
                <li
                  key={index}
                  className="before:content-['\25CB'] before:text-red-600 before:mr-2 list-none" // Custom hollow bullet point in red
                >
                  {day}: {hours}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="flex gap-4 overflow-x-auto py-4 justify-between">
          {restaurant.photos?.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-80 h-52 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        <div className="text-xl">
          <p className="font-semibold">Helpful Resources:</p>
          <p className="text-red-700">{restaurant.link}</p>
        </div>
      </div>

      <div className="px-4 mx-4 mt-6">
        <h2 className="text-2xl font-semibold mt-6">Reviews:</h2>
        <div className="mt-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="mb-6 border-b pb-4">
                <p className="text-xl">
                  <span className="text-red-700 font-extrabold text-3xl pr-3">
                    {">"}
                  </span>
                  <span>
                    <span>
                      <strong>User:</strong>
                    </span>
                    <span className="pl-7">{review.username}</span>
                  </span>
                </p>
                <p className="text-xl ml-5 pl-3">
                  <span>
                    <strong>Comments:</strong>
                  </span>
                  <span className="pl-7">{review.comments}</span>
                </p>
                <p className="text-xl ml-5 pl-3">
                  <span>
                    <strong>Star Rating:</strong>
                  </span>
                  <span className="pl-7">{review.starRatings} ⭐</span>
                </p>
                {review.photosLink && (
                  <img
                    src={review.photosLink}
                    alt="Review"
                    className="w-80 h-72 mt-2 ml-5 pl-3"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-xl">No reviews found for this restaurant.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantItem;
