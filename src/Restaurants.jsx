import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import rsts from "./Restaurant.json";

const Restaurants = () => {
  const [restaurant, setRestaurant] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load restaurant data from JSON
    const loadRestaurants = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate fetch delay
        setRestaurant(rsts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-mono text-4xl font-semibold">
        Loading....
      </div>
    );
  }

  return (
    <div className="h-full container mx-auto overflow-auto justify-center items-center flex">
      <div className="flex flex-wrap gap-11 mb-4">
        {restaurant.map((rst) => (
          <div
            key={rst.id}
            className="w-72 flex justify-around flex-col h-auto hover:bg-zinc-200 p-3"
          >
            <figure className="flex items-center justify-center">
              <img
                src={rst.title_card_img}
                alt={rst.name}
                className="w-72 h-60"
              />
            </figure>
            <h1 className="text-2xl flex flex-wrap font-semibold font-serif">
              {rst.name}
            </h1>
            <p className="text-gray-500 text-sm ">{rst.cuisine}</p>
            <p className="text-xl">{rst.location}</p>
            <div className="items-center justify-center flex flex-col gap-4">
              <button
                onClick={() => navigate(`/restaurants/${rst.id}`)} // Navigate to RestaurantItem
                className="items-center justify-center flex p-2 px-3 rounded-md bg-red-100 text-red-800 border-red-800 border-2 hover:font-semibold"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
