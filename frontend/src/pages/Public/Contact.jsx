import React from "react";
import Navbar from "../../components/Navbar";
import foret from "../../assets/foret.jpg";
import logo from "../../assets/logo.png";

function Contact() {
  return (
    <div className="bg-black ">
      <Navbar />
      <div className="md:flex">
        <img
          className="hidden md:block h-[95vh] pb-8 pl-40 rounded-lg"
          src={foret}
          alt=""
        />
        <div className="h-[80vh] md:w-[45vw] mt-20 rounded-lg pt-20 text-4xl md:mt-10 z-10 mx-auto text-center">
          <img
            className=" md:hidden md:pb-8 mx-auto rounded-lg -mt-48"
            src={logo}
            alt=""
          />
          <h3 className="font-[body] pb-4 md:py-4 underline -mt-10 md:mt-0 text-white">
            Une Question ?{" "}
          </h3>
          <div>
            <form
              action="submit"
              className="flex flex-col text-2xl px-14 py-14 border rounded-md"
            >
              <input
                type="text"
                className=" py-4 my-2 pl-4  border rounded-md"
                placeholder="Prénom"
              />
              <input
                type="text"
                className="border py-4 pl-4 my-2 rounded-md "
                placeholder="Email"
              />
              <textarea
                type="text"
                className="border py-4 pl-4 my-2 rounded-md "
                placeholder="Message"
              />
              <button
                type="button"
                className="border bg-white hover:bg-slate-300 transition ease-in-out rounded-md w-28 mx-auto p-3"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
