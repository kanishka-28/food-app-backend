import React from "react";

//Component
import { NextArrow, PrevArrow } from "./Arrows.component";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MobileDelivery = () => {

  const images = [
    "https://b.zmtcdn.com/data/o2_assets/dff007e05e2f72a4abc0772c7a8cd0951632716697.png",
    "https://b.zmtcdn.com/data/dish_images/4f2d979fcb3d1ac70db57b555d112b331634721216.png",
    "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
    "https://b.zmtcdn.com/data/o2_assets/9428a39fba2a97f7470b8f3f26af86af1632716606.png",
    "https://b.zmtcdn.com/data/o2_assets/9694b563c793ea7bddf49f619dd4b7751632716697.png",
    "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
  ]
  return (
    <div className="bg-white rounded flex flex-wrap justify-evenly pb-6">
        {
          images.map((image) => (
            <div key={image} className='w-24 h-28 my-4 rounded shadow-md border border-gray-300'>
              <img
                src={image}
                alt="Burger"
                className="w-full h-3/4 rounded"
              />
              <div>
                <h3 className="my-1 text-base font-small font-dark text-center text-gray-600">Burger</h3>
              </div>
            </div>
          ))
        }
    </div>
  )
}

const LaptopDelivery = () => {

  const settingsLg = {
    arrows: true,
    autoplay: true,
    // centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }
  const images = [
    "https://b.zmtcdn.com/data/o2_assets/dff007e05e2f72a4abc0772c7a8cd0951632716697.png",
    "https://b.zmtcdn.com/data/dish_images/4f2d979fcb3d1ac70db57b555d112b331634721216.png",
    "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
    "https://b.zmtcdn.com/data/o2_assets/9428a39fba2a97f7470b8f3f26af86af1632716606.png",
    "https://b.zmtcdn.com/data/o2_assets/9694b563c793ea7bddf49f619dd4b7751632716697.png",
    "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
  ]
  return (
    <>

      <div className="hidden md:block mx-4">
        <Slider {...settingsLg}>
          {
            images.map((image) => (
              <div key={image} className='px-1 outline-0 h-64'>
                <img
                  src={image}
                  alt="Burger"
                  className="w-full h-full rounded"
                />
              </div>
            ))
          }
         
        </Slider>
      </div>
    </>

  )
}
const DeliveryFoodCategory = () => {
  return (
    <>
      <div className="md:hidden"><MobileDelivery /></div>
      <div className="hidden md:block"><LaptopDelivery /></div>
    </>
  );
};

export default DeliveryFoodCategory;