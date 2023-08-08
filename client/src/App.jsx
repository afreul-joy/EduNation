import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop/Shop";
import ShopContextProvider from "./context/ShopContext";

function App() {
  return (
    <>
      <ShopContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </ShopContextProvider>
    </>
  );
}

export default App;
