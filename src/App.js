import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path ="/" element={<Navigate to="/home/delivery" />} />
          <Route path ="/home" >
            <Route path=":type" element={'delivery'} />
          </Route>
          <Route path="/restaurant/:id"  element={<h1>restaurant</h1>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
