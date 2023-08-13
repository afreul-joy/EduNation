import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop/Shop";
import ShopContextProvider from "./context/ShopContext";
import SubNavbar from "./Components/SubNavbar/SubNavbar";
import ComingSoon from "./Components/ComingSoon/ComingSoon";

function App() {
  return (
    <>
      <ShopContextProvider>
        <SubNavbar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/coming" element={<ComingSoon/>} />
        </Routes>
        <Footer />
      </ShopContextProvider>
    </>
  );
}

export default App;
