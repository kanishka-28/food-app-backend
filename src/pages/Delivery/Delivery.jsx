import React from 'react'
import AllCards from '../../components/Card/Card';
import Brands from '../../components/Delivery/Brands';
import DeliveryComponent from '../../components/Delivery/DeliveryComponent';

export default function Delivery() {
    return (
        <div className="flex flex-col gap-3 ">
            <DeliveryComponent/>
            <Brands/>
            <h2 className="font-semibold text-2xl">Popular Restaurants in your city</h2>
            <AllCards/>
        </div>
    )
}
