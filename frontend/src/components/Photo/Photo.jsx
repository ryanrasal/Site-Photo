/* eslint-disable react/prop-types */
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

function Photo({ photo }) {
  // Route qui delete une photo
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/photo/${id}`)
      .then((response) => {
        response.data();
        toast.success("Photo Supprimé", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 404) {
          console.warn("album deleted with success", { type: "error" });
        }
      });
  };
  return (
    <div>
      <ul
        key={photo.id}
        className="md:flex text-lg py-3 justify-between shadow-sm"
      >
        <li className="list-none text-center bg-slate-300 text-black border w-60 mx-auto md:mx-5 p-3 rounded-lg md:mt-[17px] md:mb-[20px] ">
          {photo.nom}
        </li>
        <li>
          <img
            src={`${VITE_BACKEND_URL}/uploads/${photo.image}`}
            className="mx-auto h-24 w-24"
            alt=""
          />
        </li>
        <div className="flex ml-[4rem] mr-10 p-2">
          <button
            type="button"
            className="mr-10 bg-slate-300 text-black hover:bg-black border hover:text-white p-4 rounded-lg"
          >
            Modifier
          </button>
          <button
            type="button"
            className="bg-slate-300 text-black hover:bg-black border hover:text-white p-4 rounded-lg"
            onClick={() => handleDelete(photo.id)}
          >
            Supprimer
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Photo;
