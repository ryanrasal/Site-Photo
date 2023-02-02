/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";
import error from "../../assets/error.png";
import Photo from "../../components/Photo/Photo";

const { VITE_BACKEND_URL } = import.meta.env;

function AdminPhoto() {
  // Route qui récupère les sous Album
  const [sousAlbums, setSousAlbums] = useState([]);
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/sousalbum/`)
      .then((response) => response.json())
      .then((result) => {
        setSousAlbums(result);
      });
  }, []);

  // Route qui récupère les photos
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/photo/`)
      .then((response) => response.json())
      .then((result) => {
        setPhotos(result);
      });
  }, []);

  const [selectedSousAlbumId, setSelectedSousAlbumId] = useState("0");

  // fonction et state pour filter avec la barre de recherche
  const [filterSearch, setFilterSearch] = useState("");

  function handleSearch(e) {
    const { value } = e.target;
    setFilterSearch(value);
  }

  const filterItems = photos
    .filter(
      (photo) =>
        parseInt(selectedSousAlbumId, 10) === photo.sousalbum_id ||
        selectedSousAlbumId === "0"
    )
    .filter((photo) => {
      return photo.nom.toLowerCase().includes(filterSearch.toLowerCase());
    });

  // Fin barre de recherche

  return (
    <div className="bg-white h-screen font-['body']">
      <NavigationAdmin />
      <div className=" flex flex-wrap">
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
                to="/admin/AddPhoto"
                className="md:border  md:inline ml-1 p-4 rounded-lg hover:bg-white hover:text-black"
              >
                Ajouter une photo +
              </Link>
              <label htmlFor="" className="pl-4">
                Filtrer par Sous Album
                <select
                  onChange={(e) => setSelectedSousAlbumId(e.target.value)}
                  className="rounded-lg border ml-2 p-2 md:p-4 w-40 md:w-52
                  mt-10"
                  name=""
                  id=""
                >
                  <option value="0"> </option>
                  {sousAlbums.map((sousAlbum) => (
                    <option value={sousAlbum.id} key={sousAlbum.id}>
                      {sousAlbum.nom}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-center shadow-sm mt-3">
                <h3 className=" text-3xl bold text-black">Photos</h3>
              </div>
              <td className="hidden md:flex py-2 mt-2 px-1 border-b border-gray-200 dark:border-gray-800">
                <p className="flex items-center md:mx-28 md:text-xl">Nom</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <div className="flex flex-col mb-3">
              {filterItems.length === 0 ? (
                <img
                  className=" h-[300px] w-[400px] object-fit md:ml-[35%] md:mt-20 mb-[262px] md:mb-[74px]"
                  src={error}
                  alt="Not Found"
                />
              ) : (
                filterItems.map((photo) => (
                  <div>
                    <Photo photo={photo} />
                  </div>
                ))
              )}
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminPhoto;
