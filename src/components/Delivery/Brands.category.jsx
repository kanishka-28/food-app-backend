import React from "react";

//Component
import { NextArrow, PrevArrow } from "../Carousel/Arrows.component";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const images = [
  "https://b.zmtcdn.com/data/brand_creatives/logos/5caf38856d23347b351bb7abf97134d3_1521806747.png?output-format=webp",
  "https://b.zmtcdn.com/data/brand_creatives/logos/466f8fc74274145f3b21795c3d21816d_1589432952.png?output-format=webp",
  "https://b.zmtcdn.com/data/brand_creatives/logos/aaa86c706fe235dd78dec0dd32d43d6b_1550745886.png?output-format=webp",
  "https://b.zmtcdn.com/data/brand_creatives/logos/ddc425ee369b0169900fec2738bfff26_1592480548.png?output-format=webp",
  "https://b.zmtcdn.com/data/brand_creatives/logos/f8eeab5b2de60c8b2f19c9d1015e32f9_1617972403.png?output-format=webp",
  "https://b.zmtcdn.com/data/brand_creatives/logos/c38f7540bcc5a38e918856ac06409056_1504531339.png?output-format=webp",
  "https://b.zmtcdn.com/data/brand_creatives/logos/304f7e8f12ed82f7aa1e23f076a43e65_1617972508.png?output-format=webp",
  "https://b.zmtcdn.com/data/brand_creatives/logos/6a11fd0f30c9fd9ceaff2f5b21f61d23_1617187753.png?output-format=webp",
]

const MobileBrands = () => {

  const settingsLg = {
    arrows: false,
    // centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
  }
  
  return (
    <>

      <div className="md:hidden">
        <Slider {...settingsLg}>
          {
            images.map((image) => (
              <div key={image} className='px-4 h-20 w-24'>
                <img
                  src={image}
                  alt="Burger"
                  className="w-full h-full rounded-md"
                />
                <p className="text-sm font-light text-center">26 min</p>
              </div>
            ))
          }
         
        </Slider>
      </div>
    </>

  )
}

const LaptopBrands = () => {

  const settingsLg = {
    arrows: true,
    // centerMode: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }
  
  return (
    <>

      <div className="hidden md:block mx-4">
        <Slider {...settingsLg}>
          {
            images.map((image) => (
              <div key={image} className='px-2 h-36 w-36'>
                <img
                  src={image}
                  alt="Burger"
                  className="w-full h-full rounded-md"
                />
                <p className="text-md font-light text-center">26 min</p>
              </div>
            ))
          }
         
        </Slider>
      </div>
    </>

  )
}
const BrandsCategory = () => {
  return (
    <>
      <div className="md:hidden"><MobileBrands /></div>
      <div className="hidden md:block"><LaptopBrands /></div>
      <br></br>
    </>
  );
};

export default BrandsCategory;