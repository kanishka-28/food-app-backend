import React from "react";
import { useParams } from "react-router-dom";
import Overview from "../../components/restaurantComponent/overview";
import Menu from "../../components/restaurantComponent/menu";
import Order from "../../components/restaurantComponent/order";
import Photos from "../../components/restaurantComponent/photos";
import Reviews from "../../components/restaurantComponent/reviews";

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