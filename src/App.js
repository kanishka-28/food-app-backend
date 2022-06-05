import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Delivery from "./pages/Delivery/Delivery";
import Master from "./pages/Home/Deciding";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path ="/" element={<Navigate to="/home/delivery" />} />
          <Route path ="/home" element={<Home/>} >
            <Route index element={<Navigate to="/home/delivery" />  } />
            <Route path=":type" element={<Master/>} />
          </Route>
          <Route path="search/:searchString" element={<Search/>} />
          <Route path="/restaurant/:id"  element={<h1>restaurant</h1>}/>
          <Route path="*" element={<h1>Error no page found</h1>} />
          <Route path="/auth" element={<AuthWrapper/>}>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
