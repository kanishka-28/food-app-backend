import React, { useState, useEffect } from "react";
// import { allOrdersRes, deleteorder } from '../../services/api'
import { GiScooter, GiCampCookingPot, GiDiamondsSmile } from "react-icons/gi";
import { IoTrashBinSharp } from "react-icons/io5";
import { GoSmiley } from "react-icons/go";
import { IoMdSad } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { serviceGet, servicePut } from "../../Utils/Api/Api";
import {
  setloadingFalse,
  setloadingTrue,
} from "../../Redux/Features/Loader/Slice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const AllOrders = () => {
  const [openTab, setOpenTab] = React.useState("D");
  const [order, setorder] = useState([]);
  const [acceptedorder, setacceptedorder] = useState([]);
  const [rejectedorder, setrejectedorder] = useState([]);
  const [pendingorder, setpendingorder] = useState([]);
  const location = useLocation();
  const state = location.state;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    setacceptedorder(order?.filter(e=>e.status=='accepted'));
      setrejectedorder(order?.filter(e=>e.status=='rejected' || e.status=='cancelled'));
      setpendingorder(order?.filter(e=>(e.status=='pending')));
  }, [order])
  

  useEffect(() => {
   console.log(acceptedorder);
  }, [acceptedorder])
  
  useEffect(() => {
    if (!state?.requiredRestaurant) {
      navigate("/");
    }
    getOrders();

 
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
              {acceptedorder?.length !== 0 ? (
                acceptedorder?.map((data, i) => (
                 
                      <div
                        key={data}
                        className="bg-green-200 my-2 mx-auto lg:w-3/4 flex justify-between border-b border-gray-200 shadow-lg px-2 align-center py-6"
                      >
                        <div >
                          <div className="max-h-20 overflow-y-auto no-scrollbar ">
                          {data?.orderDetails?.map((v, i) => (
                            <h4 key={i}>
                              {data?.foodItems[i].name}{" "}
                              <span className="font-semibold">{`${v?.quantity} X ${v.price}`}</span>
                            </h4>
                          ))}
                          </div>
                          
                          <h4 className="font-semibold">
                            Total - ₹ {data?.itemTotal}
                          </h4>
                          <p className="text-gray-600">
                            Delivering To - {data?.user[0]?.userName} <br />
                            {data?.user[0]?.address} <br />
                            {data?.user[0]?.city}
                          </p>
                          <h4>
                            Ordered at - {new Date(data?.createdAt).toDateString()}
                          </h4>
                        </div>
                        <GoSmiley
                          size={"2rem"}
                          color={"green"}
                          className="mr-4"
                        />
                      </div>
                   
                ))
              ) : (
                <div className="text-center bg-yellow-100 border border-dashed border-gray-400 p-2 ">
                  this restaurant does not have any delivered orders
                </div>
              )}
            </div>
            <div className={openTab === "P" ? "block" : "hidden"} id="link1">
              {pendingorder.length !== 0 ? (
                pendingorder.map((data) => (
                  <div
                    key={order}
                    className="bg-yellow-100 my-2 mx-auto lg:w-3/4 flex justify-between items-center border-b border-gray-200 shadow-lg px-2 align-center py-6"
                  >
                    <div>
                    <div className="max-h-20 overflow-y-auto no-scrollbar ">
                          {data?.orderDetails?.map((v, i) => (
                            <h4 key={i}>
                              {data?.foodItems[i].name}{" "}
                              <span className="font-semibold">{`${v?.quantity} X ${v.price}`}</span>
                            </h4>
                          ))}
                          </div>
                      <h4 className="font-semibold">
                        Total - ₹ {data?.itemTotal}
                      </h4>
                      <p className="text-gray-600">
                        Delivering To - {data?.user[0]?.userName} <br />
                        {data?.user[0]?.address} <br />
                        {data?.user[0]?.city}
                      </p>
                      <h4>
                            Ordered at - {new Date(data?.createdAt).toDateString()}
                          </h4>
                    </div>
                    <div className="flex gap-8">
                      <button
                        onClick={async() => {
                          dispatch(setloadingTrue());
                          try {
                              const {message} = await servicePut(`order/update/${data?._id}`,{status :"accepted"})
                              toast.success("Order Accepted");
                              setpendingorder(pendingorder?.filter(e=> e._id !== data?._id));
                              setacceptedorder([data, ...acceptedorder]);
                          } catch (error) {
                            toast.error(error.response.data.message);
                          }
                          finally{
                            dispatch(setloadingFalse());
                          }
                        }}
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded hover:scale-110 ease-in duration-200"
                      >
                        Accept Order
                      </button>
                      <button
                        onClick={async() => {
                          dispatch(setloadingTrue());
                          try {
                              const {message} = await servicePut(`order/update/${data?._id}`,{status :"rejected"})
                              toast.success("Order Rejected");
                              setpendingorder(pendingorder?.filter(e=> e._id !== data?._id));
                              setrejectedorder([{...data,status: "rejected"}, ...rejectedorder]);
                          } catch (error) {
                            toast.error(error.response.data.message);
                          }
                          finally{
                            dispatch(setloadingFalse());
                          }
                        }}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded hover:scale-110 ease-in duration-200"
                      >
                        Reject Order
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-center bg-yellow-100 border border-dashed border-gray-400 p-2 align-center">
                  this restaurant does not have any pending orders
                </div>
              )}
              
            </div>
            <div className={openTab === "R" ? "block" : "hidden"} id="link1">
              {rejectedorder.length !== 0 ? (
                rejectedorder.map((data) => {
                  if(data.status === "rejected")
                  return  <div
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
                      <h4>
                            Ordered at - {new Date(data?.createdAt).toDateString()}
                          </h4>
                    </div>
                    <p className="text-red-600 font-bold">Rejected</p>

                    <IoMdSad
                          size={"2rem"}
                          color={"red"}
                          className="mr-4"
                        />
                  </div>
                  else {
                    <div className="lg:w-3/4 bg-red-200 flex justify-between  border-b border-gray-200 shadow-lg p-2 align-center my-8">
                     <div>
                      {
                        data?.orderDetails?.map((v,i)=>
                          <h4>{data?.foodItems[i].name} <span className="font-semibold">{`${v?.quantity} X ${v.price}`}</span></h4>
                        )
                      }
                      <h4 className="font-semibold">
                         Total - ₹ {data?.itemTotal}
                        
                      </h4>
                      <p className="text-gray-600">
                        Delivering To - {data?.user[0]?.userName} <br />
                        {data?.user[0]?.address} <br />
                        {data?.user[0]?.city} 
                      </p>
                      <h4>
                            Ordered at - {new Date(data?.createdAt).toDateString()}
                          </h4>
                    </div>
                    <p className="text-red-600 font-bold">Cancelled</p>
                  </div>
                  }
                })
              ) : (
                <div className="text-center bg-yellow-100 border border-dashed border-gray-400 p-2 ">
                  No Rejected Order
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
