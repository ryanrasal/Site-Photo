import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Album from "../../components/Album/Album";
import NavigationAdmin from "../../components/NavigationAdmin";
import error from "../../assets/error.png";

function AdminAlbum() {
  // refresh de la page au moment du delete
  const [refresh, setRefresh] = useState(false);

  // Route qui récupère les albums
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/album")
      .then((response) => response.json())
      .then((result) => {
        setAlbums(result);
      });
  }, [refresh]);

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
    <div className="bg-white h-screen font-['body'] ">
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
                to="/admin/AddAlbum"
                className="md:border md:inline md:ml-1 p-4 rounded-lg hover:bg-white hover:text-black"
              >
                Ajouter un album +
              </Link>
              <div className="flex justify-center shadow-sm">
                <h3 className="text-3xl bold text-black ">Albums</h3>
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
                filterItems.map((album) => (
                  <div key={album.id}>
                    <Album album={album} setRefresh={setRefresh} />
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

export default AdminAlbum;
