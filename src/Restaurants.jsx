import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import rsts from "./Restaurant.json";

const Restaurants = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load restaurant data from JSON
    const loadRestaurants = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate fetch delay
        setRestaurant(rsts);
        setFilteredRestaurants(rsts); // Initialize filteredRestaurants with all data
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  const handleSearch = (filters) => {
    const {
      searchQuery,
      cuisine,
      priceRange,
      location,
      dietary,
      ambiance,
      features,
    } = filters;

    const filtered = restaurant.filter((rst) => {
      const matchesQuery =
        !searchQuery ||
        rst.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = !cuisine || rst.cuisine === cuisine;

      const matchesLocation = !location || rst.location === location;
      const matchesDietary =
        !dietary || rst.dietaryRestrictions.includes(dietary);
      const matchesAmbiance = !ambiance || rst.ambiance.includes(ambiance);
      const matchesFeatures = !features || rst.features.includes(features);
      const matchesPrice = !priceRange || rst.priceRange.includes(priceRange);

      return (
        matchesQuery &&
        matchesCuisine &&
        matchesPrice &&
        matchesLocation &&
        matchesDietary &&
        matchesAmbiance &&
        matchesFeatures
      );
    });

    setFilteredRestaurants(filtered);
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

  return (
    <div className="h-full container mx-auto overflow-auto">
      {/* SearchBar Component */}
      <SearchBar onSearch={handleSearch} />

      <div className="flex flex-wrap gap-11 mb-4 pt-5">
        {/* Show "Not Found!" if no results */}
        {filteredRestaurants.length === 0 ? (
          <div className="flex flex-col pt-2 items-center text-red-700 justify-center w-full font-mono text-3xl font-medium">
            <figure>
              <img
                src="https://images.squarespace-cdn.com/content/v1/5a8189f2e45a7c1f4ef452c2/1631691717581-KY4QBKUTSI3I8TOQ2NZK/1.gif?format=500w"
                alt="not found"
                className="w-60 h-48"
              />
            </figure>
            <div>
              Not Found!! Please try searching for another restaurant or modify
              your filters.
            </div>
          </div>
        ) : (
          filteredRestaurants.map((rst) => (
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
              <p className="text-gray-500 text-sm">{rst.cuisine}</p>
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
          ))
        )}
      </div>
    </div>
  );
};

export default Restaurants;
