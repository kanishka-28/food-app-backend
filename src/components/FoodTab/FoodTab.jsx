import React, { useState} from 'react'
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoMdBeer } from "react-icons/io";
import { GiMorgueFeet } from "react-icons/gi";

import { useParams,Link } from "react-router-dom";
const MobileTab = () => {
    const { type } = useParams();
    const [allTypes] = useState([
        {
            id: `delivery`,
            icon: <MdOutlineDeliveryDining/>,
            name: "Delivery",
            isActive: false
        },
        {
            id: `nightlife`,
            icon: <IoMdBeer/>,
            name: "Nightlife",
            isActive: false

        },
        {
            id: `dining`,
            // icon: <GiMorgueFeet/>,
            name: "Dining Out",
            isActive: false

        }
    ]);
    
    return (
        <div className="md:hidden bg-white border pb-3 flex fixed justify-between bottom-0 z-30 w-full text-gray-500">
            {
                allTypes.map((item) => {
                    return (
                        <Link to={`/home/${item.id}`} >
                            <div className={
                                type===item.id || (type===undefined && item.id=== "delivery") ? "flex flex-col items-center text-xl pt-3 text-zomato-400 border-t-2 border-zomato-400 " : "flex flex-col items-center text-xl pt-3"
                            } >
                                {item.icon}
                                <h5>{item.name}</h5>
                            </div>
                        </Link>
                       
                    )

                }
                )
            }


            </div>
        )
};

const MdTab= ()=>{

    const { type } = useParams();

    const [allTypes] = useState([
        {
            id: `delivery`,
            icon: <MdOutlineDeliveryDining />,
            name: "Delivery",
            isActive: false
        },
        {
            id: `nightlife`,
            icon: <IoMdBeer/>,
            name: "Nightlife",
            isActive: false

        },
        {
            id: `dining`,
            icon: <GiMorgueFeet/>,
            name: "Dining Out",
            isActive: false

        }
    ]);
    
    return (
        <div className="hidden md:flex bg-white border-b px-36 pt-3 flex items-start gap-16  z-10 w-full text-gray-500">
            {
                allTypes.map((item) => {
                    return (
                        <Link to={`/home/${item.id}`}>
                        
                        <div className={
                            type===item.id || (type===undefined && item.id=== "delivery") ? "flex gap-4 pt-2 pb-4 items-center text-xl text-zomato-400 border-b-2 border-zomato-400 " : "flex gap-4 pt-2 pb-4  items-center text-xl"
                        } >
                            <span className={item.isActive?"bg-blue-100 rounded-full p-2":"bg-white p-2"}>

                            {item.icon}
                            </span>
                            <h5>{item.name}</h5>
                        </div>
                        </Link>
                    )

                }
                )
            }


            </div>
        )

};

export default function FoodTab() {
    return (
        <>
            <div>
                <MobileTab />
                <MdTab/>
            </div>
        </>
    )
}

//master_url:type

//delivery, dining , nightlife -> type