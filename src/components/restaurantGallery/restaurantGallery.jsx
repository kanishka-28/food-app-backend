import React, { useState } from "react";
import {
  RiStarLine,
  RiShareForwardLine,
  RiBookmark3Line,
  RiDirectionLine,
  RiShareForwardFill,
} from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiTwotoneStar } from "react-icons/ai";
import { GiSevenPointedStar } from "react-icons/gi";
import { Photo } from "../restaurantComponent/photos";
import { MobOrder } from "../restaurantComponent/order";
import { capitalize } from "../../utlis/Capitalise";
import { RWebShare } from "react-web-share";

const RestaurantGallery = ({ setType, requiredRestaurant, uploadedImages }) => {
  return (
    <>
      <div className="w-full ">
        <img src={uploadedImages?.length > 0 ? uploadedImages[0].url : "https://b.zmtcdn.com/data/pictures/9/19227209/1f3b5f252dc37e874e8e96e82e5ed277.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"} className="md:hidden block w-full h-full " alt="bigImage" />
        <div className="hidden md:flex lg:m-4 items-center h-96 w-full ">
          <div className="  w-3/4 h-full overflow-hidden object-cover ">
            <img src={uploadedImages?.length > 0 ? uploadedImages[0].url : "https://b.zmtcdn.com/data/pictures/9/19227209/1f3b5f252dc37e874e8e96e82e5ed277.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"} className="duration-1000 transform hover:scale-110 h-full w-full" alt="bigImage" />
          </div>
          <div className="m-1 h-full w-1/3 hidden md:block">
            <div className=" flex h-1/2 mb-1 w-full gap-2">
              <div className=" w-1/2 h-full overflow-hidden ">
                <img src={uploadedImages?.length > 1 ? uploadedImages[1].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full h-full duration-1000 transform hover:scale-110" alt="smallImage" />
              </div>
              <div className="w-1/2 overflow-hidden">
                <img src={uploadedImages?.length > 2 ? uploadedImages[2].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full h-full  duration-1000 transform hover:scale-110" alt="smallImage" />
              </div>
            </div>
            <div className="h-1/2 pb-1 flex w-full gap-2">
              <div className=" w-1/2  overflow-hidden ">
                <img src={uploadedImages?.length > 3 ? uploadedImages[3].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full h-full duration-1000 transform hover:scale-110" alt="smallImage" />
              </div>
              <div className="w-1/2 overflow-hidden">
                <img src={uploadedImages?.length > 4 ? uploadedImages[4].url : "https://b.zmtcdn.com/data/pictures/9/19227209/da93155e3b621000dd24fa992c107a80.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*"} className="w-full  h-full  duration-1000 transform hover:scale-110" alt="smallImage" />
              </div>
            </div>
          </div>
        </div>
        <div className="m-4 md:flex justify-between">
          <h1>{capitalize(requiredRestaurant?.name)}</h1>
          <div className="text-gray-500 text-sm flex justify-between">
            <div className="w-8 h-7 text-white rounded bg-gray-500 text-center flex gap-1 items-center p-1 mt-2">
              -<GiSevenPointedStar className="text-yellow-400" />
            </div>
            <div className="mr-6">
              <div className="text-black mx-2 font-semibold">0</div>
              <div className="border-gray-400 border-b-2 border-dashed mx-2 ">
                dining reviews
              </div>
            </div>
            <div className="w-12 h-7 flex gap-1 text-white rounded bg-green-600 font-bold justify-center items-center  mt-2">
              3.2 <AiTwotoneStar className="text-white" />
            </div>
            <div>
              <div className="text-black mx-2 font-semibold">9000</div>
              <div className="border-gray-400 border-b-2 border-dashed mx-2 ">
                delivery reviews
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <MobOrder setType={setType} />
        </div>
        <div className="m-4 font-light word-wrap">
          <h3>{capitalize(requiredRestaurant?.address)}</h3>
          <h2 className="text-lg mt-2 text-gray-500">
            {capitalize(requiredRestaurant?.city)}
          </h2>
          <div className="text-gray-600 my-0.5 flex gap-1 items-center">
            <p>{requiredRestaurant?.restauarntTimings} (Today)</p>
            <HiOutlineInformationCircle className="pt-0.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="flex gap-2">
          <div
            onClick={() => {
              window.open(
                `https://www.google.com/maps/@${requiredRestaurant.mapLocation.latitude},${requiredRestaurant.mapLocation.longitude},18.65z`,
                "_blank"
              );
            }}
            className=" w-32 h-10 text-center m-1 rounded-lg border-gray-400 border py-1 bg-megenta-400 text-white flex justify-center items-center gap-2 cursor-pointer hover:scale-110 ease-in duration-200"
          >
            <RiStarLine />
            <p> Direction</p>
          </div>
          <div
            onClick={() => {
              setType("reviews");
              window.scrollBy(0, 1000);
            }}
            className="cursor-pointer w-32 h-10 text-center m-1 rounded-lg border-gray-400 border py-1 bg-white text-red-500 flex justify-center items-center gap-2 hover:scale-110 ease-in duration-200"
          >
            <RiDirectionLine />
            <p className="text-gray-500"> Add Review</p>
          </div>

          <div>
            <RWebShare
              data={{
                text: "Like humans, flamingos make friends for life",
                url: `http://localhost:3000`,
                title: capitalize(requiredRestaurant?.name),
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <div className="flex">
                <div className="cursor-pointer w-32 h-10 text-center m-1 rounded-md border-gray-400 border py-1 bg-white text-red-500 flex justify-center items-center gap-2  hover:scale-110 ease-in duration-200">
                  <RiShareForwardLine className="w-5 h-5" />{" "}
                  <p className="text-gray-500">Share</p>
                </div>
              </div>
            </RWebShare>
          </div>
        </div>
        {/* it may not render here */}
        <Photo restaurant={requiredRestaurant} />
      </div>
    </>
  );
};

export default RestaurantGallery;
