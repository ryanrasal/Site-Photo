import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";
import error from "../../assets/error.png";

function AdminAlbum() {
  // refresh de la page au moment du delete
  const [refresh, setRefresh] = useState(false);

  const [sousAlbums, setSousAlbums] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/sousAlbum")
      .then((response) => response.json())
      .then((result) => {
        setSousAlbums(result);
      });
  }, [refresh]);

  const navigate = useNavigate();
  // Route qui delete un album
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/sousAlbum/${id}`)
      .then(() => {
        navigate("/admin/sousAlbum");
        toast.success("Sous Album Supprimé", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setRefresh(true);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 404) {
          console.warn("album deleted with success", { type: "error" });
        }
      });
  };

  // fonction et state pour filter avec la barre de recherche
  const [filterSearch, setFilterSearch] = useState("");

  function handleSearch(e) {
    const { value } = e.target;
    setFilterSearch(value);
  }

  const filterItems = sousAlbums.filter((album) => {
    return album.nom.toLowerCase().includes(filterSearch.toLowerCase());
  });

  // Fin barre de recherche
  return (
    <div className="bg-white h-screen font-['body']">
      <NavigationAdmin />
      <div className="flex flex-wrap">
        <table className="w-full text-left">
          <thead>
            <tr>
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Rechercher..."
                className="rounded-lg border pl-4 md:ml-10 p-2 md:p-4 w-40 md:w-52 mt-10"
              />
              <Link
                to="/admin/AddSousAlbum"
                className="md:border md:inline md:ml-1 p-4 rounded-lg hover:bg-white hover:text-black"
              >
                Ajouter un Sous Album +
              </Link>
              <div className="flex justify-center shadow-sm">
                <h3 className=" text-3xl bold text-black ">Sous Albums</h3>
              </div>
              <td className="hidden md:flex py-2 mt-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <p className="flex items-center md:mx-28 md:text-xl">Nom</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <div className="flex flex-col">
              {filterItems.length === 0 ? (
                <img
                  className=" h-[300px] w-[400px] object-fit md:ml-[35%] md:mt-20 mb-[262px] md:mb-[74px]"
                  src={error}
                  alt="Not Found"
                />
              ) : (
                filterItems.map((sousAlbum) => (
                  <ul className="md:flex py-3 justify-between shadow-sm">
                    <li
                      className="list-none text-center bg-slate-300 text-black border w-60 mx-auto md:mx-5 p-3 rounded-lg md:mt-[17px] md:mb-[20px] "
                      key={sousAlbum.id}
                    >
                      {" "}
                      {sousAlbum.nom}
                    </li>
                    <div className="flex ml-[4rem] mr-10 p-2">
                      <button
                        type="button"
                        className="mr-10 bg-slate-300 text-black hover:bg-black border hover:text-white p-4 rounded-lg"
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-slate-300 text-black hover:bg-black border hover:text-white p-4 rounded-lg"
                        type="button"
                        onClick={() => handleDelete(sousAlbum.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </ul>
                ))
              )}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAlbum;
