import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu from "../assets/menu.png";
import logoNav from "../assets/logo.png";
import croix from "../assets/croix.png";

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <div className="md:flex items-center  md:justify-around md:px-10 px-7">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 py:8 top-6 cursor-pointer md:hidden z-10 "
        >
          <img
            className="h-8 transition-all duration-300 ease-in-out "
            src={open ? `${croix} ` : `${menu}`}
            alt=""
          />
        </button>
        <div>
          <ul
            className={`md:flex  md:items-center md:pb-0 pb-12 font-['body'] absolute md:static md:z-auto z-1 left-0  w-full md:w-auto md:mt-[-100px] md:pl-0 pl-9 transition-all duration-300 ease-in ${
              open ? " bg-[#A8998F] md:bg-black " : "top-[-490px]"
            }`}
          >
            <li className=" md:ml-8 text-xl md:my-0 my-7">
              <Link
                to="/"
                className="md:text-white hover:text-gray-300 duration-300 text-4xl"
              >
                Accueil
              </Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to="/galerie"
                className="md:text-white hover:text-gray-300 duration-300 text-4xl"
              >
                Galerie
              </Link>
            </li>
            <li className="hidden md:block md:ml-8 text-xl md:my-0 my-7">
              <img className="w-96 h-96" src={logoNav} alt="" />
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to="/contact"
                className="md:text-white hover:text-gray-300 duration-300 text-4xl"
              >
                Contact
              </Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7 font-['Cormorant Garamond']">
              <Link
                to="/connexionAdmin"
                className="md:text-white hover:text-gray-300 duration-300 text-4xl"
              >
                Connexion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
