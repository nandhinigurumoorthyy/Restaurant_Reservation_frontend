import About from "./About";
import Contact from "./Contact";
import Error from "./Error";
import Frontpage from "./Frontpage";
import Home from "./Home";
import Login from "./Login";
import RestaurantItem from "./RestaurantItem";
import Restaurants from "./Restaurants";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/create" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error" element={<Error />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantItem />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
