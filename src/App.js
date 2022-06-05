import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Master from "./pages/Home/Deciding";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
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
          <Route path="search/:searchString" element={<Search/>} />
        
          <Route path="/auth" element={<AuthWrapper/>}>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
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
