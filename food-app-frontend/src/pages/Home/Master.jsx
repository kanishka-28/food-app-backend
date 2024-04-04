import React from 'react'
import { useParams } from "react-router-dom";
import Nightlife from '../../components/NightLife/NightLife';

//components
import Delivery from '../Delivery/Delivery'
import DiningOut from '../DineOut/DineOut';
import Kitchen from '../Kitchen/Kitchen';
// import Nightlife from '../Nightlife';
// import AddFood from '../ownersTab/addFood';
// import AllOrders from '../ownersTab/allOrders';

export default function Master() {
    const {type} = useParams();
    return (
        <>
        <div className="m-4">
            {type==="delivery" && <Delivery/>}   
        </div>
        <div className="m-4">
            {type==="nightlife" && <Nightlife/>}   
        </div>
        <div className="m-4">
            {type==="kitchen" && <Kitchen/>}   
        </div>
        <div className="m-4">
            {type==="dining" && <DiningOut/>}   
        </div>
        {/* <div className="m-4">
            {type === "addFood" && <AddFood/> }
        </div>
        <div className="m-4">
            {type === "allOrders" && <AllOrders/> }
        </div> */}
        </>
    )
}
