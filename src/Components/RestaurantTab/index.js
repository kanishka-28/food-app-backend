import React, { useState} from 'react'
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import { useParams,Link } from "react-router-dom";

export default function OwnerTab() {

    const { type } = useParams();
    const [allTypes] = useState([
        {
            id: `addFood`,
            icon: <IoFastFoodOutline/>,
            name: "Add Food",
            isActive: false

        },
        {
            id: `allOrders`,
            icon: <GiNotebook/>,
            name: "All Orders",
            isActive: false

        }
    ]);
const MobileTab = () => {

    return (
        <div className="md:hidden bg-white border pb-3 flex fixed justify-between bottom-0 z-30 w-full text-gray-500">
            {
                allTypes.map((item) => {
                    console.log(item.id);
                    return (
                        <Link to={`/home/${item.id}`} >
                            <div className={
                                type===item.id ? "flex flex-col items-center text-xl pt-3 text-zomato-400 border-t-2 border-zomato-400 " : "flex flex-col items-center text-xl pt-3"
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
  
    return (
        <div className="hidden md:flex bg-white border-b px-36 pt-3 flex items-start gap-16  z-10 w-full text-gray-500">
            {
                allTypes.map((item) => {
                    return (
                        <Link to={`/home/${item.id}`}>
                        
                        <div className={
                            type===item.id ? "flex gap-4 pt-2 pb-4 items-center text-xl text-zomato-400 border-b-2 border-zomato-400 " : "flex gap-4 pt-2 pb-4  items-center text-xl"
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