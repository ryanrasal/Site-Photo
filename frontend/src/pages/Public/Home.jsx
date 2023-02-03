import React from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";
import appareil from "../../assets/appareil.png";

function Home() {
  return (
    <div className="w-full h-screen bg-center bg-cover bg-header bg-fit ">
      <Navbar />
      <div className="md:h-96 h-[100vh] w-[45vw] md:bg-white md:bg-opacity-70 text-4xl  font-[body] rounded-md  text-center mx-auto">
        <div>
          <img className="h-96  mx-auto" src={appareil} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
