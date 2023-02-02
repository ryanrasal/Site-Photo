/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import error from "../../assets/error.png";

const { VITE_BACKEND_URL } = import.meta.env;

// const { VITE_BACKEND_URL } = import.meta.env;

function Galerie() {
  // Récupère les données des albums avec un fetch vers le back et les postes dans galerie
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/album`)
      .then((response) => response.json())
      .then((result) => {
        setAlbums(result);
      });
  }, []);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const [dataAlbum, setDataAlbum] = useState("");

  // State pour les modales sur un hover de photo
  const [modal, setModal] = useState(false);
  // Fin hover de photo

  // fonction et state pour filter avec la barre de recherche
  const [filterSearch, setFilterSearch] = useState("");

  function handleSearch(e) {
    const { value } = e.target;
    setFilterSearch(value);
  }

  const filterItems = albums.filter((album) => {
    return album.nom.toLowerCase().includes(filterSearch.toLowerCase());
  });

  // Fin barre de recherche

  return (
    <div className="bg-black px-10 ">
      <Navbar />
      <h2 className="pt-20 text-white text-4xl font-['body'] text-center md:mt-[-50px] pb-10 md:pt-0">
        Quel album souhaites-tu voir ?{" "}
      </h2>
      <div className="flex justify-center pb-8">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Rechercher..."
          className="rounded-full border border-blue-500 pl-4 py-3"
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:ml-14">
        {filterItems.length === 0 ? (
          <img
            className=" h-[300px] w-[400px] object-fit md:ml-[108%] mb-[262px] md:mb-[74px]"
            src={error}
            alt="Not Found"
          />
        ) : (
          filterItems.map((album) => (
            <div key={album.id}>
              <p className=" flex justify-center md:pb-4 text-white text-3xl font-['body']">
                {album.nom}
              </p>
              <button
                type="button"
                className="md:mb-[74px]"
                onClick={() => setDataAlbum(album)}
              >
                <Link to={`/galerie/sousAlbum/${album.id}`}>
                  <img
                    className=" h-[250px] md:h-[300px] w-[400px]   "
                    src={`${VITE_BACKEND_URL}/uploads/${album.image}`}
                    alt=""
                  />
                </Link>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Galerie;
