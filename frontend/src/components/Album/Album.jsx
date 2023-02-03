/* eslint-disable react/prop-types */
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// const { VITE_BACKEND_URL } = import.meta.env;

function Album({ album, setRefresh }) {
  const navigate = useNavigate();

  // Route qui delete un album
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/album/${id}`)
      .then(() => {
        toast.success(`Album ${album.nom} Supprimé`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        navigate("/admin/album");
        setRefresh(true);
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
      {" "}
      <ul className="md:flex py-3 justify-between shadow-sm">
        <li
          className="list-none text-center bg-slate-300 text-black border w-60 mx-auto md:mx-5 p-3 rounded-lg md:mt-[17px] md:mb-[20px] "
          key={album.id}
        >
          {" "}
          {album.nom}
        </li>
        <div className="flex ml-[4rem] mr-10 p-2">
          <Link
            to={`/admin/editAlbum/${album.id}`}
            type="button"
            className="mr-10 flex items-center bg-slate-300 text-black hover:bg-black border hover:text-white p-4 rounded-lg"
          >
            Modifier
          </Link>
          <button
            type="button"
            className="bg-slate-300 text-black hover:bg-black border hover:text-white p-4 rounded-lg"
            onClick={() => handleDelete(album.id)}
          >
            Supprimer
          </button>
        </div>
      </ul>
    </div>
  );
}

export default Album;
