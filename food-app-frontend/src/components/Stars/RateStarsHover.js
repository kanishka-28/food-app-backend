import React from "react";
import ReactStars from "react-rating-stars-component";


export default function RateStars({ handleChange }) {


    const Example = {
        size: 40,
        count: 5,
        isHalf: false,
        value: 0,
        onChange: handleChange,
    };


    return (
        <div>
            <ReactStars {...Example} />
        </div>
    );
}
