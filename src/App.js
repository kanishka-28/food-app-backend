import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Master from "./pages/Home/Deciding";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Restaurant from "./pages/Restaurant/Restaurant";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home/delivery" />} />
          <Route path="/home" element={<Home />} >
            <Route index element={<Navigate to="/home/delivery" />} />
            <Route path=":type" element={<Master />} />
          </Route>
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<h1>Error no page found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
