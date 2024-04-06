import React from "react";
import Overview from "../../Components/restaurantComponent/Overview";
import Menu from "../../Components/restaurantComponent/Menu";
import Order from "../../Components/restaurantComponent/Order";
import Reviews from "../../Components/restaurantComponent/Reviews";

//Components

const TabComponent = ({type, uploadedImages,state}) => {

  return (<>
    <div className="m-4">
    {type === "overview" && <Overview/> }
    {type === "menu" && <Menu /> }
    {type === "order" && <Order /> }
    {type === "reviews" && <Reviews /> }
    </div>
    </>);
};

export default TabComponent;