/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCurrentSearchContext } from "../../context/SearchContext";
import Navbar from "../../components/Navbar";
import error from "../../assets/error.png";
import Loader from "../../Loader/Loader";

const { VITE_BACKEND_URL } = import.meta.env;

function SousAlbum() {
  // Appel le context pour récuperer la valeur de la recherche
  const { filterSearch, handleSearch } = useCurrentSearchContext();

  // loader pour le chargement de la page
  const [loader, setLoader] = useState(true);

  // Récupère l'id de l'album sélectionné dans l'url
  const { albumId } = useParams();

  // Récupère tous les sousAlbum
  const [sousAlbums, setSousAlbums] = useState([]);

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/sousAlbum/${albumId}`)
      .then((response) => response.json())
      .then((result) => {
        setSousAlbums(result);
        setLoader(false);
      });
  }, []);

  // const qui filtre les sous albums selon la recherche
  const filterItems = sousAlbums.filter((sousalbum) => {
    return sousalbum.nom.toLowerCase().includes(filterSearch.toLowerCase());
  });

  return loader ? (
    <Loader />
  ) : (
    <div className="bg-black ">
      <Navbar />
      <h2 className="pt-20 text-white text-4xl font-['body'] text-center md:mt-[-50px] pb-10 md:pt-0">
        Quel Sous album souhaites-tu voir ?
      </h2>
      <div className="flex justify-center pb-8">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Rechercher..."
          className="rounded-full border border-blue-500 pl-4 py-3"
        />
      </div>
      <div className="flex flex-col pb-24 md:grid md:grid-cols-3 gap-10 md:ml-14">
        {filterItems.length === 0 ? (
          <img
            className=" h-[300px] w-[400px] object-fit md:ml-[108%] mb-[262px] md:mb-[74px]"
            src={error}
            alt="Not Found"
          />
        ) : (
          filterItems.map((sousalbum) => (
            <Link
              to={`/galerie/sousalbum/photo/${sousalbum.id}`}
              key={sousalbum.id}
            >
              <div className=" h-[400px] w-[350px] bg-[#FFDCBA] mx-auto rounded-lg">
                <div className="flex justify-center shadow-md">
                  <h3 className="font-['body'] text-2xl pb-5 pt-2">
                    {sousalbum.nom}
                  </h3>
                </div>
                <img
                  className=" pt-5  h-[300px] object-contain mx-auto md:mb-[74px]"
                  src={`${VITE_BACKEND_URL}/uploads/${sousalbum.image}`}
                  alt=""
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default SousAlbum;
