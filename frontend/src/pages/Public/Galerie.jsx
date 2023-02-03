import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentSearchContext } from "../../context/SearchContext";
import Navbar from "../../components/Navbar";
import error from "../../assets/error.png";
import Loader from "../../Loader/Loader";

const { VITE_BACKEND_URL } = import.meta.env;

function Galerie() {
  // Appel le context pour changer la valeur de la recherche
  const { filterSearch, handleSearch } = useCurrentSearchContext();

  // loader pour le chargement de la page si trop de données à chargers
  const [loader, setLoader] = useState(true);

  // Récupère les données des albums avec un fetch vers le back et les postes dans galerie
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/album`)
      .then((response) => response.json())
      .then((result) => {
        setAlbums(result);
        setLoader(false);
      });
  }, []);

  // const qui filtre les albums selon la recherche
  const filterItems = albums.filter((album) => {
    return album.nom.toLowerCase().includes(filterSearch.toLowerCase());
  });

  return loader ? (
    <Loader />
  ) : (
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
              <Link to={`/galerie/sousAlbum/${album.id}`}>
                <img
                  className=" h-[250px] md:h-[300px] w-[400px]   "
                  src={`${VITE_BACKEND_URL}/uploads/${album.image}`}
                  alt=""
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Galerie;
