import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantData from "./Restaurant.json"; // Import your local JSON
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const RestaurantItem = () => {
  const [restaurant, setRestaurant] = useState(); // Holds the selected restaurant data
  const [loading, setLoading] = useState(true);
  const { restaurantId } = useParams(); // Extract `id` from the URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const getRestaurant = () => {
      try {
        // Find the restaurant by matching its id
        const foundRestaurant = restaurantData.find(
          (rst) => rst.id === parseInt(restaurantId, 10)
        );
        setRestaurant(foundRestaurant || null); // Set the restaurant or null if not found
      } catch (err) {
        console.error("Error fetching restaurant:", err);
      } finally {
        setLoading(false);
      }
    };
    getRestaurant();
  }, [restaurantId]);

  const handleReserveClick = () => {
    navigate(`/restaurants/${restaurantId}/reservepage`);
  };

  const handleReview = () => {
    navigate(`/restaurants/${restaurantId}/review`);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center font-mono text-4xl font-semibold">
        <figure>
          <img
            src="https://i.gifer.com/origin/ba/ba60429a7e91ea8f097537268b095a47_w200.gif"
            alt="loading gif"
          />
        </figure>
        <div>Loading....</div>
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
        <div className="flex flex-col gap-10 w-2/3">
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-semibold">{restaurant.name}</h1>
              <p className="text-gray-600 text-xl">{restaurant.cuisine}</p>
            </div>
            <p className="text-xl italic">{restaurant.description}</p>

            <p className="text-xl flex flex-wrap">
              <p className="font-semibold pr-7">Location:</p>{" "}
              {restaurant.location}
            </p>
            <p>
              <span className="text-xl font-semibold pr-7">Price:</span>
              <span className="text-2xl">{restaurant.priceRange}</span>
            </p>
            <p>
              <span className="text-xl font-semibold pr-7">Rating:</span>
              <span className="text-2xl">{restaurant.rating} ⭐</span>
            </p>
          </div>
        </div>
        {/* Restaurant Image */}
        <div className="w-1/3 gap-2 flex flex-col">
          <div className="flex justify-center items-center">
            <button
              onClick={handleReserveClick}
              className="w-44 rounded-xl border-2 bg-red-700 flex justify-center items-center text-white px-3 py-2 hover:border-2 hover:border-red-800 text-xl"
            >
              Reserve now!!
            </button>
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              onClick={handleReview}
              className="w-64 rounded-xl border-2 bg-red-700 flex justify-center items-center text-white px-3 py-1 hover:border-2 hover:border-red-800 text-xl"
            >
              Write a Review...
            </button>
          </div>
          <figure className=" flex justify-center items-center">
            <img
              src={restaurant.title_card_img}
              alt={restaurant.name}
              className="w-80 h-56"
            />
          </figure>
        </div>
      </div>

      {/* menus, featuers, working , photos,contact*/}
      <div className="px-4 mx-4">
        <div className="text-xl flex flex-wrap">
          <p className="font-semibold">Menu:</p>
          <ul className="pl-5">
            {restaurant.menus?.map((item, index) => (
              <li key={index} className="flex items-center gap-2 mb-2">
                <span className="text-red-700 font-bold">{">"}</span>
                <span className="flex-1">{item.dish}</span>
                <span className="text-gray-600 pl-8">₹ {item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xl flex gap-3 flex-wrap">
          <p className="font-semibold">Features: </p>
          <ul className="pl-8">
            {restaurant.features?.map((feature, index) => (
              <li key={index} className="text-black relative">
                <span className="absolute -left-6 text-red-700  font-bold">
                  •
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
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
          <p className="font-semibold">For further Contact:</p>
          <p className="text-red-700">{restaurant.link}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantItem;
