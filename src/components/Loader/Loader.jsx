import React from "react";
import img from "../../assets/loader/Loader.svg";
const Loader = () => {
  return (
    <div
      className="w-full absolute h-full backdrop-blur-sm  backdrop-brightness-75 backdrop-opacity-75 flex items-center justify-center z-50"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "50",
      }}
    >
      <div className="w-3/4 h-fit">
        <img src={img} className="w-full h-screen" alt="loading" />
      </div>
    </div>
  );
};

export default Loader;
