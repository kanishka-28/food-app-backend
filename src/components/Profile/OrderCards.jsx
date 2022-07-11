import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../redux/features/cart/slice";
import { allRestaurants } from "../../redux/features/restaurants/selector";

const Product = ({ item, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="border-2 border-gray-200 p-3 shadow-lg w-72 items-center hover:bg-gray-100 mb-2">
      <div className="flex items-center justify">
        <div
          onClick={() => navigate(`/restaurant/${id}`)}
          className="cursor-pointer text-red-500 text-lg w-3/5"
        >
          {item?.restaurant?.name.slice(0, 20)}
        </div>
        {item?.status === "accepted" ? (
          <div
            className={`w-fit p-4 rounded-full bg-green-400 font-semibold text-white`}
          >
            {item?.status}
          </div>
        ) : item?.status === "pending" ? (
          <div
            className={`w-fit p-4 rounded-full bg-yellow-400 font-semibold `}
          >
            {item?.status}
          </div>
        ) : (
          <div
            className={`w-fit p-4 rounded-full bg-megenta-400 font-semibold text-white`}
          >
            {item?.status}
          </div>
        )}
        <div></div>
      </div>
      {item?.orderDetails?.map((data, i) => (
        <div key={i} className="pt-2">
          <hr />
          <div className="flex items-center gap-2 justify-between">
            <span className="font-bold text-md">
              {item?.foodItems[i]?.name}
            </span>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="font-semibold text-sm">
              {data?.quantity} x {data?.price}
            </div>
            <div className="font-semibold text-sm">
              ₹ {data?.quantity * data?.price}
            </div>
          </div>
        </div>
      ))}
      <br />
      <hr />
      <div className="flex items-center gap-2 justify-between">
        <div className="font-semibold text-sm">Total:</div>
        <div className="font-semibold text-sm">₹ {item?.itemTotal}</div>
      </div>
    </div>
  );
};

export default Product;
