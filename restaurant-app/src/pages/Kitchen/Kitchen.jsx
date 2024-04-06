import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import TabComponent from "./TabComponents";
import { allKitchens } from "../../Redux/Features/Kitchen/Selector/Selector";
import KitchenGallery from "../../Components/kitchenGallery/KitchenGallery";
import FoodTabKitchen from "../../Components/FoodTab/FoodTabKitchen";

const Kitchen = () => {

  const { id } = useParams();

  const [type, setType] = useState('order');
  const kitchens = useSelector(allKitchens);
  const [kitchen, setkitchen] = useState(null);
  const [toggle, settoggle] = useState(false);


  useEffect(() => {
    setkitchen(kitchens.filter(e => e._id === id)[0]);
  }, [toggle, kitchens])

  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="w-full mx-auto lg:px-20">
        <KitchenGallery requiredKitchen={kitchen}/>
        <div className="sticky top-0 z-10">
          <FoodTabKitchen type={type} setType={setType} />
        </div>
        <TabComponent type={type} state={[toggle, settoggle]} />
      </div>
    </>
  );
};

export default Kitchen;