/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import error from "../../assets/error.png";

const { VITE_BACKEND_URL } = import.meta.env;

function SousAlbum() {
  const [sousAlbums, setSousAlbums] = useState([]);

  const { albumId } = useParams();

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/sousAlbum/${albumId}`)
      .then((response) => response.json())
      .then((result) => {
        setSousAlbums(result);
      });
  }, []);

  // fonction et state pour filter avec la barre de recherche
  const [filterSearch, setFilterSearch] = useState("");

  function handleSearch(e) {
    const { value } = e.target;
    setFilterSearch(value);
  }

  const filterItems = sousAlbums.filter((sousalbum) => {
    return sousalbum.nom.toLowerCase().includes(filterSearch.toLowerCase());
  });
  // Fin barre de recherche

  return (
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
                <div className="flex justify-center">
                  <h3 className="text-2xl pb-5 pt-2">{sousalbum.nom}</h3>
                </div>
                <img
                  className=" pt-5 object-contain mx-auto md:mb-[74px]"
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
