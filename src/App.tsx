import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import AuthPage from "./pages/auth";
import MyBookings from "./pages/my-booking";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="mt-[100px]">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Route >
        </Routes>
      </div>
    </>
  );
};

export default App;
