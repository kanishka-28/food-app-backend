import React from "react";
import ReactStars from "react-rating-stars-component";


export default function RatingStars({value}) {

    const firstExample = {
        size: 20,
        value: value,
        edit: false
    };

    return (
        <div className="z-5">
            <ReactStars {...firstExample} />
        </div>
    );
}
