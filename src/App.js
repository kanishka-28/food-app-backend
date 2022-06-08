import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AddFood from "./pages/AddFood/AddFood";
import Home from "./pages/Home/Home";
import AllOrders from "./pages/Orders/AllOrders";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} >
          </Route>
          <Route path="/food" element={<Navbar />} >
            <Route path="add" element={<AddFood />} />
            <Route path="orders" element={<AllOrders />} />
          </Route>
          <Route path="*" element={<h1>Error no page found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
