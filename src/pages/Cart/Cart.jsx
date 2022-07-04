import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Checkout from "../../components/Cart/checkout";
import Product from "../../components/Cart/product";
import Navbar from "../../components/Navbar/Navbar";
import { user } from "../../redux/features/auth/selector/selector";
import { itemTotal, orderDetails, restaurantId, status } from "../../redux/features/cart/selector/selector";

const Cart = () => {

  const navigate = useNavigate();
  const userDetails = useSelector(user);
  const restaurant = useSelector(restaurantId);
  const items = useSelector(orderDetails);
  const total = useSelector(itemTotal);
  const stat = useSelector(status);

  return (
    <>
      <Navbar />
      <div className="w-full lg:w-11/12 mt-2 mx-auto lg:px-28 ">
        <div className="block md:flex shadow-md ">
          <div className=" w-full lg:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{items?.length}</h2>
            </div>
            {
              items?.length == 0 ? <div className="text-xl font-semibold text-center">Your cart is empty!</div>
                :
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                    Total
                  </h3>
                </div>
            }
            <div className="h-auto max-h-96 w-full overflow-y-auto ">
              {/* <div style={scrollContainer} > */}
              {
                items?.map((item, i) => (
                  <Product key={i} item={item} id={restaurant} />
                ))
              }
            </div>
            <p
              onClick={() => {
                navigate(-1);
              }}
              className="flex font-semibold text-zomato-500 text-sm mt-10 cursor-pointer"
            >
              <svg
                className="fill-current mr-2 text-zomato-400 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </p>
          </div>
          <Checkout payload={{user:userDetails._id, restaurant, orderDetails:items, itemTotal:total}}/>
        </div>
      </div>
    </>
  );
};

export default Cart;
