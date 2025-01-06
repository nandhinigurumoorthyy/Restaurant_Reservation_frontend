import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    priceRange: "",
    location: "",
    dietary: "",
    ambiance: "",
    features: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchQuery, ...filters });
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search Restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 hover:border-2 hover:border-red-700 rounded w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="cuisine"
            value={filters.cuisine}
            onChange={handleInputChange}
            className="p-2 hover:border-2 hover:border-red-700 rounded"
          >
            <option value="">Cuisine</option>
            <option value="Indian">Indian</option>
            <option value="Vegan">Vegan</option>
            <option value="BBQ">BBQ</option>
            <option value="Seafood">Seafood</option>
            <option value="Italian">Italian</option>
          </select>

          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleInputChange}
            className="p-2 hover:border-2 hover:border-red-700 rounded"
          >
            <option value="">Price Range</option>
            {Array.from({ length: 3 }, (_, i) => 2000 + i * 5000).map(
              (price) => (
                <option key={price} value={price}>
                  ₹{price} - ₹{price + 5000}
                </option>
              )
            )}
          </select>

          <select
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            className="p-2 hover:border-2 hover:border-red-700 rounded"
          >
            <option value="">Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
          </select>

          <select
            name="dietary"
            value={filters.dietary}
            onChange={handleInputChange}
            className="p-2 hover:border-2 hover:border-red-700 rounded"
          >
            <option value="">Dietary Restrictions</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>

          <select
            name="ambiance"
            value={filters.ambiance}
            onChange={handleInputChange}
            className="p-2 hover:border-2 hover:border-red-700 rounded"
          >
            <option value="">Ambiance</option>
            <option value="Casual">Casual</option>
            <option value="Romantic">Romantic</option>
            <option value="Family">Family</option>
          </select>

          <select
            name="features"
            value={filters.features}
            onChange={handleInputChange}
            className="p-2 hover:border-2 hover:border-red-700 rounded"
          >
            <option value="">Special Features</option>
            <option value="Outdoor Seating">Outdoor Seating</option>
            <option value="Live Music">Live Music</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-700 text-white p-2 font-medium rounded hover:bg-red-800 hover:border-red-700 hover:border-2"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
