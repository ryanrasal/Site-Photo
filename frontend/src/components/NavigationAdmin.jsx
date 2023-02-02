import React from "react";
import { Link, useNavigate } from "react-router-dom";
import deconnexion from "../assets/deconnexion.png";

function NavigationAdmin() {
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    navigate("/connexionAdmin");
  };
  return (
    <div className="text-black text-2xl pt-10 bg-slate-300 ">
      <ul className="flex justify-around md:pb-4 ">
        <Link to="/admin/album">
          <li className="hover:text-gray">Album</li>
        </Link>
        <Link to="/admin/sousalbum">
          <li>Sous Album</li>
        </Link>
        <Link to="/admin/photo">
          <li>Photo</li>
        </Link>
        <div>
          <button type="button" onClick={onClick}>
            <li className="md:hidden">
              <img src={deconnexion} className="h-10" alt="" />
            </li>
            <li className="md:block hidden">Deconnexion</li>
          </button>
        </div>
      </ul>
    </div>
  );
}

export default NavigationAdmin;
