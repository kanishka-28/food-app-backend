import React from 'react'
import BrandsCategory from './Brands.category';

const Brands = () => {
    return (
        <>
        <div className="flex flex-col md:hidden ">
            <div className="py-8">
                <img src="https://b.zmtcdn.com/web/assets/8d13109e07c5d49d54427f044d7b7d281620042855.png?output-format=webp" 
                alt="adv"/>
            </div>
        </div>
        <div>
            <h1 className="font-semibold text-xl">Top Brands For You</h1><br/>
        </div>
        <div>
            <BrandsCategory/>
        </div>
        <br/>
        </>
    )
}

export default Brands;