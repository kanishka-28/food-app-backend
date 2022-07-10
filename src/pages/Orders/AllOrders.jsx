import React, { useState, useEffect } from "react";
// import { allOrdersRes, deleteorder } from '../../services/api'
import { GiScooter, GiCampCookingPot, GiDiamondsSmile } from "react-icons/gi";
import { IoTrashBinSharp } from "react-icons/io5";
import { GoSmiley } from "react-icons/go";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { serviceGet } from "../../Utils/Api/Api";
import {
  setloadingFalse,
  setloadingTrue,
} from "../../Redux/Features/Loader/Slice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const AllOrders = () => {
  const [openTab, setOpenTab] = React.useState("D");
  const [order, setorder] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const orders = [1, 2, 3, 4];
  const getOrders = async () => {
    dispatch(setloadingTrue());
    try {
      const { orders } = await serviceGet(`order/res/${id}`);
      console.log(orders);
      setorder(orders);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setloadingFalse());
    }
  };
  useEffect(() => {
    if (!state?.requiredRestaurant) {
      navigate("/");
    }
    getOrders();

    // const id = JSON.parse(localStorage.getItem("user"))._id;
    // Promise.resolve(allOrdersRes(id)).then((res)=>{
    //     console.log(res);
    //     setorders(res.data.getOrders.orderDetails)
    //     console.log(orders);
    // }).catch((e)=>{
    //     console.log(e.response);
    // })
  }, []);

  return (
    <>
      <div className=" md:w-3/4 mx-auto py-2 flex flex-col md:flex-row items-center gap-4 ">
        <h1 className="text-6xl font-bold text-center md:w-3/5 ">
          <span className="text-red-400">Orders for </span>{" "}
          {state?.requiredRestaurant?.name}
        </h1>
        <div className="flex justify-center">
          <img
            src={state?.requiredRestaurant?.coverImage}
            alt="restaurant image"
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center  mx-auto md:w-3/4 ">
        <div className=" w-full ">
          <ul
            className="flex justify-center gap-8 md:gap-20 mb-0 text-xl pt-6 text-gray-500 overflow-x-auto no-scrollbar"
            role="tablist"
          >
            <li
              className={`hover:text-zomato-500 text-center pb-2 ${
                openTab === "D" &&
                "text-zomato-400 border-b-2 border-zomato-400"
              }`}
            >
              <a
                className={
                  "" +
                  (openTab === "D" &&
                    "text-zomato-400 border-b-2 border-zomato-400")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("D");
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <div className="flex items-center gap-4">
                  <GiScooter size={"1.8rem"} />
                  <p>Delivered</p>
                </div>
              </a>
            </li>
            <li
              className={`hover:text-zomato-500 text-center pb-2 ${
                openTab === "P" &&
                "text-zomato-400 border-b-2 border-zomato-400"
              }`}
            >
              <a
                className={
                  "" +
                  (openTab === "P" &&
                    "text-zomato-400 border-b-2 border-zomato-400")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("P");
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <div className="flex items-center gap-4">
                  <GiCampCookingPot size={"1.7rem"} />
                  <p>Pending</p>
                </div>
              </a>
            </li>
            <li
              className={`hover:text-zomato-500 text-center pb-2 ${
                openTab === "R" &&
                "text-zomato-400 border-b-2 border-zomato-400"
              }`}
            >
              <a
                className={
                  "" +
                  (openTab === "R" &&
                    "text-zomato-400 border-b-2 border-zomato-400")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab("R");
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <div className="flex items-center gap-4">
                  <IoTrashBinSharp size={"1.5rem"} />
                  <p>Rejected</p>
                </div>
              </a>
            </li>
          </ul>
          <div className="mt-10 ">
            <div className={openTab === "D" ? "block" : "hidden"} id="link1">
              {order?.length !== 0 ? (
                order?.map((data, i) => (
                  <div
                    key={data}
                    className="bg-green-200 my-2 mx-auto lg:w-3/4 flex justify-between border-b border-gray-200 shadow-lg px-2 align-center py-6"
                  >
                    <div>
                      {data?.orderDetails?.map((v, i) => (
                        <h4>
                          {data?.foodItems[i].name}{" "}
                          <span className="font-semibold">{`${v?.quantity} X ${v.price}`}</span>
                        </h4>
                      ))}
                      <h4 className="font-semibold">
                        Total - ₹ {data?.itemTotal}
                      </h4>
                      <p className="text-gray-600">
                        Delivering To - {data?.user[0]?.userName} <br />
                        {data?.user[0]?.address} <br />
                        {data?.user[0]?.city}
                      </p>
                    </div>
                    <GoSmiley size={"2rem"} color={"green"} className="mr-4" />
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                  this restaurant dont have any order
                </div>
              )}
            </div>
            <div className={openTab === "P" ? "block" : "hidden"} id="link1">
              {order.length !== 0 ? (
                order.map((data) => (
                  <div
                    key={order}
                    className="bg-yellow-100 my-2 mx-auto lg:w-3/4 flex justify-between items-center border-b border-gray-200 shadow-lg px-2 align-center py-6"
                  >
                    <div>
                      {data?.orderDetails?.map((v, i) => (
                        <h4>
                          {data?.foodItems[i].name}{" "}
                          <span className="font-semibold">{`${v?.quantity} X ${v.price}`}</span>
                        </h4>
                      ))}
                      <h4 className="font-semibold">
                        Total - ₹ {data?.itemTotal}
                      </h4>
                      <p className="text-gray-600">
                        Delivering To - {data?.user[0]?.userName} <br />
                        {data?.user[0]?.address} <br />
                        {data?.user[0]?.city}
                      </p>
                    </div>
                    <div className="flex gap-8">
                      <button
                        onClick={() => {}}
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded hover:scale-110 ease-in duration-200"
                      >
                        Accept Order
                      </button>
                      <button
                        onClick={() => {}}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded hover:scale-110 ease-in duration-200"
                      >
                        Reject Order
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                  this restaurant dont have any order
                </div>
              )}
              <div className="lg:w-3/4 bg-red-200 flex justify-between  border-b border-gray-200 shadow-lg p-2 align-center my-8">
                <div>
                  <h4>Food Name (quantity)</h4>
                  <p className="text-gray-600">
                    To - Mumbai Places, Mumbai Locality, Post Office
                  </p>
                  <h4 className="font-semibold">
                    ₹ 500 <span className="text-sm">(2 x 250)</span>₹400
                  </h4>
                </div>
                <p className="text-red-600 font-bold">Cancelled</p>
              </div>
            </div>
            <div className={openTab === "R" ? "block" : "hidden"} id="link1">
              {order.length !== 0 ? (
                order.map((data) => (
                  <div
                    key={data}
                    className="bg-red-200 my-2 mx-auto lg:w-3/4 flex justify-between border-b border-gray-200 shadow-lg px-2 align-center py-6"
                  >
                    <div>
                      {data?.orderDetails?.map((v, i) => (
                        <h4>
                          {data?.foodItems[i].name}{" "}
                          <span className="font-semibold">{`${v?.quantity} X ${v.price}`}</span>
                        </h4>
                      ))}
                      <h4 className="font-semibold">
                        Total - ₹ {data?.itemTotal}
                      </h4>
                      <p className="text-gray-600">
                        Delivering To - {data?.user[0]?.userName} <br />
                        {data?.user[0]?.address} <br />
                        {data?.user[0]?.city}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                  No Deleted Order
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrders;
