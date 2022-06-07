import React from "react";
import ReactStars from "react-rating-stars-component";


export default function RateStars({ value }) {


    const Example = {
        size: 40,
        count: 5,
        isHalf: false,
        value: 0,
        onChange: newValue => {
            console.log(`Example 3: new value is ${newValue}`);
        }
    };


    return (
        <div>
            <ReactStars {...Example} />
        </div>
    );
}
