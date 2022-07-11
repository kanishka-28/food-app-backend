import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { servicePut } from "../../utlis/connection/api";
import {useDispatch} from 'react-redux'
import { setloadingFalse, setloadingTrue } from "../../redux/features/Loader/slice";

const Product = ({ item, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cancelOrder= async ()=>{
        dispatch(setloadingTrue());
        try {
            await servicePut(`order/update/${item._id}`, {status: 'cancelled'})
            toast.success('Order cancelled successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(setloadingFalse());
        }
    }

    return (
        <div className="border-2 border-gray-200 px-3 pt-3 pb-1 shadow-lg w-72 items-center hover:bg-gray-100 mb-2">
            <div className="flex items-center justify-between">
                <div
                    onClick={() => navigate(`/restaurant/${item?.restaurant?._id}`)}
                    className="cursor-pointer text-blue-900 text-lg w-3/5"
                >
                    {item?.restaurant?.name?.slice(0, 20)}
                </div>
                <div className={`w-fit p-3 rounded-full font-semibold text-white ${item?.status == 'pending' && 'bg-yellow-500'} ${item?.status == 'accepted' && 'bg-green-500'} ${(item?.status == 'rejected'|| item?.status === 'cancelled') && 'bg-red-500'}`}>{item?.status}</div>
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
            {
                item?.status==="pending" &&
                <div onClick={cancelOrder} className="text-sm text-red-500 cursor-pointer">Cancel Order</div>

            }
        </div>
    );
};

export default Product;
