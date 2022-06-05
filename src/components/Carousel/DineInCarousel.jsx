import React from "react";

//Component
import { NextArrow, PrevArrow } from "./Arrows.component";
import { VscTriangleRight } from "react-icons/vsc";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
    "https://b.zmtcdn.com/data/collections/deca6b2c5e28d0c8472e8c111d9bb53d_1625727726.jpg",
    "https://b.zmtcdn.com/data/collections/deca6b2c5e28d0c8472e8c111d9bb53d_1625727726.jpg",
    "https://b.zmtcdn.com/data/collections/deca6b2c5e28d0c8472e8c111d9bb53d_1625727726.jpg",
    "https://b.zmtcdn.com/data/collections/deca6b2c5e28d0c8472e8c111d9bb53d_1625727726.jpg",
    "https://b.zmtcdn.com/data/collections/deca6b2c5e28d0c8472e8c111d9bb53d_1625727726.jpg",
    "https://b.zmtcdn.com/data/collections/deca6b2c5e28d0c8472e8c111d9bb53d_1625727726.jpg",
]
const MobileDineIn = () => {
    const settingsSm = {
        arrows: false,
        autoplay: false,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }
    return (
        <>

            <div className="md:hidden mx-4">
                <Slider {...settingsSm}>
                    {
                         images.map((image) => (
                            <div className='px-1 h-64 relative'>
                                <img
                                    src={image}
                                    alt="Burger"
                                    className="w-full h-full rounded-md"
                                />
                                <h2 className="text-lg text-white absolute bottom-6 left-4 z-10" >Best rasgulla of Bhopal</h2>
                                <div className="text-md text-white absolute bottom-2 left-4 flex items-center z-10" >13 places <VscTriangleRight className="w-4 pt-1" /></div>
                            </div>
                        ))
                    }

                </Slider>
            </div>
        </>

    )
}

const LaptopDineIn = () => {

    const settingsLg = {
        arrows: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }
   
    return (
        <>

            <div className="hidden md:block mx-4">
                <Slider {...settingsLg}>
                    {
                        images.map((image,i) => (
                            <div key={i} className='px-4 h-64 relative'>
                                <img
                                    src={image}
                                    alt="Burger"
                                    className="w-full h-full rounded-md"
                                />
                                <h2 className="text-lg text-white absolute bottom-6 left-6 z-10" >Best rasgulla of Bhopal</h2>
                                <div className="text-md text-white absolute bottom-2 left-6 flex items-center z-10" >13 places <VscTriangleRight className="w-4 pt-1" /></div>
                            </div>
                        ))
                    }

                </Slider>
            </div>
        </>

    )
}

const DineInCarousel = () => {
    return (
        <>
            <div className="flex flex-col gap-3" >
                <h2 className="text-2xl font-semibold" >Collections</h2>
                <h5 className="text-lg text-gray-500">Explore curated lists of top restaurants, cafes, pubs, and bars in Bhopal, based on trends</h5>
                <MobileDineIn />
                <LaptopDineIn />
            </div>

        </>
    )
}

export default DineInCarousel;