import { Outlet } from "react-router-dom";
import FoodTab from "../../components/FoodTab/FoodTab";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-[500px]  mx-auto md:px-0 lg:px-5 xl:px-20 ">
        <div className="sticky top-0 z-10">
          <FoodTab />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
