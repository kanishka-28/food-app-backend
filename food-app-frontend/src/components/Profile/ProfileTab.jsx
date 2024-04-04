import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { user } from '../../redux/features/auth/selector/selector';
import { setloadingFalse, setloadingTrue } from '../../redux/features/Loader/slice';
import { serviceGet } from '../../utlis/connection/api';
import Review from '../Card/Review';
import Product from './OrderCards';

const ProfileTab = () => {
  const { tabId } = useParams();
  const dispatch = useDispatch();
  const [orders, setorders] = useState([]);
  const [reviews, setreviews] = useState([]);
  const userDetails = useSelector(user);

  const getAllReviews = async () => {
    dispatch(setloadingTrue());
    try {
      const { reviews } = await serviceGet(`review/user/${userDetails._id}`);
      setreviews(reviews);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setloadingFalse());
    }
  }

  const getMyOrders = async () => {
    dispatch(setloadingTrue());
    try {
      const { orders } = await serviceGet(`order/user/${userDetails._id}`);
      
      setorders(orders);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setloadingFalse());
    }
  }

  useEffect(() => {
    getAllReviews();
    getMyOrders();
  }, [])


  return (
    <>
      <div className="flex flex-col md:flex-row items-start">
        <ul
          className="nav nav-tabs mx-auto flex items-end  md:mx-0  md:flex-col md:flex-wrap list-none border-b-0 pl-0 md:mr-4"
          id="tabs-tabVertical"
          role="tablist"
        >
          <li className="nav-item flex-grow" role="presentation">
            <Link
              to={"/me/orders"}
              className={` ${tabId == "orders" &&
                "bg-megenta-100 hover:bg-megenta-200 md:border-l-4 border-b-4 md:border-b-0 border-megenta-400 shadow-lg"
                } nav-link block font-medium text-md leading-tight uppercase border-x-0 border-t-0 border-b-2  px-6 py-3 my-2  hover:bg-gray-200`}
              id="tabs-messages-tabVertical"
              data-bs-toggle="pill"
              data-bs-target="#tabs-messagesVertical"
              role="tab"
              aria-controls="tabs-messagesVertical"
              aria-selected="false"
            >
              My Orders
            </Link>
          </li>
          <li className="nav-item flex-grow" role="presentation">
            <Link
              to={"/me/reviews"}
              className={` ${tabId == "reviews" &&
                "bg-megenta-100 hover:bg-megenta-200 md:border-l-4 border-b-4 md:border-b-0 border-megenta-400 shadow-lg"
                } nav-link block font-medium leading-tight uppercase border-x-0 border-t-0 border-b-2  px-6 py-3 my-2  hover:bg-gray-200 active`}
              id="tabs-home-tabVertical"
              data-bs-toggle="pill"
              data-bs-target="#tabs-homeVertical"
              role="tab"
              aria-controls="tabs-homeVertical"
              aria-selected="true"
            >
              Reviews
            </Link>{" "}
          </li>

        </ul>
        <div
          className="tab-content p-4  w-full h-56 overflow-y-auto no-scrollbar"
          id="tabs-tabContentVertical"
        >
          {tabId == "reviews" && (
            <div
              className="tab-pane fade show active"
              id="tabs-homeVertical"
              role="tabpanel"
              aria-labelledby="tabs-home-tabVertical"
            >
              {reviews.length !== 0 ? reviews.map((e, i) => (
                <Review key={i} e={e} />
              )) :
                <h4>No Reviews</h4>
              }
            </div>
          )}

          {tabId == "orders" && (
            <div
              className="tab-pane fade show active"
              id="tabs-homeVertical"
              role="tabpanel"
              aria-labelledby="tabs-home-tabVertical"
            >
              <div className='mb-3 flex flex-wrap justify-evenly'>
                {orders.length !== 0 ? orders.map((e, i) => (
                  <Product key={i} item={e} id={e.restaurant} />
                )) :
                  <h4>No Orders</h4>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfileTab