import React from "react";
import loaderimg from "../assets/loader.gif";
import Navbar from "../components/Navbar";

export default function Loader() {
  return (
    <div className="bg-black">
      <Navbar />
      <div className="flex justify-center">
        <div className="">
          <img src={loaderimg} alt="Loader plane" />
          <h2 className="text-white text-2xl">Chargement...</h2>
        </div>
      </div>
    </div>
  );
}
