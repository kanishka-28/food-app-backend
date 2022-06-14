import React from "react";
import Overview from "../../Components/restaurantComponent/Overview";
import Menu from "../../Components/restaurantComponent/Menu";
import Order from "../../Components/restaurantComponent/Order";
import Photos from "../../Components/restaurantComponent/Photos";
import Reviews from "../../Components/restaurantComponent/Reviews";

//Components

const TabComponent = ({type}) => {

  return (<>
    <div className="m-4">
    {type === "overview" && <Overview /> }
    {type === "menu" && <Menu /> }
    {type === "order" && <Order /> }
    {type === "photos" && <Photos /> }
    {type === "reviews" && <Reviews /> }
    </div>
    </>);
};

export default TabComponent;