import React from 'react'
import Brands from '../../components/Delivery/Brands';
// import Brands from '../brands/index'
// import Cards from '../cards/index'
import DeliveryComponent from '../../components/Delivery/DeliveryComponent';

export default function Delivery() {
    return (
        <div className="flex flex-col gap-3 ">
            <DeliveryComponent/>
            <Brands/>
            {/* <Cards/> */}
        </div>
    )
}
