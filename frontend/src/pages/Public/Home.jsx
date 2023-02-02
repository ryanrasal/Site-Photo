import React from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";

function Home() {
  return (
    <div className="w-full h-screen bg-center bg-cover bg-header bg-fit ">
      <Navbar />
      <div className="md:h-96 h-[100vh] w-[45vw] bg-white bg-opacity-70 text-4xl  font-[body] rounded-md  text-center mx-auto">
        {" "}
        Mirdine Photo{" "}
      </div>
    </div>
  );
}

export default Home;
