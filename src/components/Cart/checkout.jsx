import React from 'react'
import toast from 'react-hot-toast';

const Checkout = ({payload}) => {

    const PlaceOrder=async()=>{
        let arr=payload?.orderDetails;
        try {
            if(payload?.orderDetails?.length==0){
                toast.error('No item added in your cart.');
                return;
            }
           
            arr = arr?.map((data)=>{
                // return data.food = data.food._id;
                return {...data ,food : data.food._id};
            })
            console.log(arr);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="summary" className="w-full md:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Items - {payload?.orderDetails?.length}</span>
                <span className="font-semibold text-sm">{payload?.itemTotal}</span>
            </div>
            <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping - 0.00</option>
                </select>
            </div>

            <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>{payload?.itemTotal}</span>
                </div>
                <button onClick={PlaceOrder} className="bg-zomato-400 rounded font-semibold hover:bg-zomato-500 py-3 text-sm text-white uppercase w-full">
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default Checkout