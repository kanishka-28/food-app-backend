import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setloadingFalse,
  setloadingTrue,
} from "../../../Redux/Features/Loader/Slice";
import { serviceGet } from "../../../Utils/Api/api";
import Review from "../../Cards/Review";

const Reviews = () => {
  const [reviews, setreviews] = useState([]);
  const [toggle, settoggle] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const getAllReviews = async () => {
    dispatch(setloadingTrue());
    try {
      const { reviews } = await serviceGet(`review/rest/${id}`);
      setreviews(reviews);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setloadingFalse());
    }
  };

  useEffect(() => {
    getAllReviews();
  }, [toggle]);

  return (
    <div className="w-full">
      {reviews?.length !== 0 ? (
        <div className="lg:w-1/2">
          {reviews?.map((e) => {
            return (
              <Review e={e} key={e._id} toggle={toggle} settoggle={settoggle} />
            );
          })}
        </div>
      ) : (
        <div className="w-full text-gray-600 mt-10 flex justify-center items-center">
          <h4>No Reviews yet!!</h4>
        </div>
      )}
    </div>
  );
};

export default Reviews;
