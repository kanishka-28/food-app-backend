import React, { useState } from 'react'
import { useParams, Link } from "react-router-dom";

const MdTab = ({ setType, type }) => {


    const [allTypes] = useState([
        {
            id: `overview`,
            name: "Overview",
            isActive: false
        },
        {
            id: `order`,
            name: "Foods",
            isActive: false

        },
        {
            id: `menu`,
            name: "Menu",
            isActive: false

        },
        {
            id: `photos`,
            name: "Photos",
            isActive: false
        },
        {
            id: `reviews`,
            name: "Reviews",
            isActive: false
        },
    ]);

    return (
        <div className="flex bg-white border-b pt-3 flex items-start  z-10 w-full text-gray-500">
            {
                allTypes.map((item) => {
                    return (
                        <div key={item.id} className={type === item.id ? " pt-4 pb-2 px-6  cursor-pointer  text-xl text-zomato-400 border-b-2 border-zomato-400 " : " cursor-pointer pt-4 px-6 pb-2  text-lg"} >
                            <h5 className={item.id == 'reviews' ? 'hidden sm:block' : 'block'} onClick={() => setType(item.id)}>{item.name}</h5>
                        </div>
                    )

                }
                )
            }


        </div>
    )

};

export default function FoodTab({ setType, type }) {
    return (
        <>
            <div  >
                <MdTab setType={setType} type={type} />
            </div>
        </>
    )
}

//master_url:type
//delivery, dining , nightlife -> type
