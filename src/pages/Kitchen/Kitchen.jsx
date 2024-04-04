import React from 'react'
import AllCards from '../../components/Card/Card';
import DeliveryComponent from '../../components/Delivery/DeliveryComponent';
import KitchenCarousel from '../../components/CloudKitchen/CloudKitchen';


export default function Kitchen() {
    return (
        <div className="flex flex-col gap-3  ">
            <KitchenCarousel/>
            <h2 className="font-semibold  text-2xl">Home Kitchens in your city</h2>
            <AllCards/>
        </div>
    )
}
