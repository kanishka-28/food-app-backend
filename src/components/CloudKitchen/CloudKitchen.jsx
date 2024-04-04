import React from 'react'

//components
import DeliveryFoodCategory from '../Carousel/index'


export default function KitchenCarousel() {
    return (
        <div className="my-6">
            <h1 className="text-xl font-semibold mt-3 mb-10" >Eat what makes you happy</h1>
            <div>
                <DeliveryFoodCategory />
            </div>
        </div>
    )
}