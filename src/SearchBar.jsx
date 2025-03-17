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
    onSearch({ searchQuery, ...filters }); // Send filters to the parent component
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md" style={{ backgroundColor: "#341920" }}>
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="cursor-pointer p-2 border-2 border-stone-50 hover:border-pink-900 rounded w-full"
        />

        {/* Filters */}
        
          <select
            name="cuisine"
            value={filters.cuisine}
            onChange={handleInputChange}
            className="cursor-pointer p-2 border-2 border-stone-50 hover:border-pink-900 rounded"
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
            className="cursor-pointer p-2 border-2 border-stone-50 hover:border-pink-900 rounded"
          >
            <option value="">Price Range</option>
            <option value="₹2000 - ₹7000">₹2000 - ₹7000</option>
            <option value="₹7000 - ₹12000">₹7000 - ₹12000</option>
            <option value="₹12000 - ₹17000">₹12000 - ₹17000</option>
          </select>

          <select
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            className="cursor-pointer p-2 border-2 border-stone-50 hover:border-pink-900 rounded"
            
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
            className="cursor-pointer p-2 border-2 border-stone-50 hover:border-pink-900 rounded"
           
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
            className=" cursor-pointer p-2 border-2 border-stone-50 hover:border-pink-900 rounded"
           
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
            className="cursor-pointer p-2 border-2 border-stone-50 hover:border-pink-900 rounded"
            
          >
            <option value="">Special Features</option>
            <option value="Outdoor Seating">Outdoor Seating</option>
            <option value="Live Music">Live Music</option>
            <option value="Casual Dining">Casual Dining</option>
            <option value="Organic Menu">Organic Menu</option>
            <option value="Private Rooms">Private Rooms</option>
            <option value="Group Dining">Group Dining</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex justify-center items-center">
        <button
          type="submit"
          className="cursor-pointer py-2 px-3 font-medium rounded-2xl hover:bg-white  hover:text-pink-950 border-2 border-white text-stone-50"
        >
          Search
        </button></div>
      </form>
    </div>
  );
};

export default SearchBar;
