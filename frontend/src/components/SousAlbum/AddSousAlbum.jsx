/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSousAlbum() {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/album`)
      .then((response) => response.json())
      .then((result) => {
        setAlbums(result);
      })
      .catch(console.error);
  }, []);

  const [dataSousAlbum, setSousDataAlbum] = useState({
    nom: "",
    lieu: "",
    nombrePhoto: "",
    image: "",
    album_id: "",
  });

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const onChange = (e) => {
    setSousDataAlbum({
      ...dataSousAlbum,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      dataSousAlbum.nom &&
      dataSousAlbum.lieu &&
      dataSousAlbum.nombrePhoto &&
      dataSousAlbum.image &&
      dataSousAlbum.album_id
    ) {
      const myHeaders = new Headers();

      const sousAlbum = JSON.stringify(dataSousAlbum);

      const formData = new FormData();

      formData.append("sousalbum", sousAlbum);
      formData.append("picture", inputRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };
      // On appelle le back. Si tous les middleware placé sur la route ci-dessous, je pourrais être renvoyé à la route login
      fetch(`http://localhost:5000/api/sousAlbum`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          toast.success("Album Créé", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          navigate("/admin/sousalbum");
        })
        .catch(console.error);
    }
  };

  return (
    <div className="absolute h-96 w-96">
      <div>
        <div className="fixed top-0 overflow-y-scroll bg-white w-screen h-screen">
          <Link to="/admin/sousalbum" type="button">
            <img
              className="mt-2 ml-2 md:mt-6 md:ml-4"
              src="../src/assets/croix.png"
              alt="Close"
            />
          </Link>
          <h1 className="text-[32px] px-6 text-black font-bold text-center md:text-4xl">
            Créer un Sous Album
          </h1>
          <div className=" flex justify-center mt-6 ">
            <form
              onSubmit={(e) => handleSubmit(e)}
              method="PUT"
              className="flex flex-col"
            >
              <input
                type="text"
                name="nom"
                value={dataSousAlbum.nom}
                onChange={onChange}
                placeholder="Nom de l'Album"
                className="w-80 my-2 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
              />
              <input
                type="text"
                name="lieu"
                value={dataSousAlbum.lieu}
                onChange={onChange}
                placeholder="Lieu du Shooting"
                className="w-80 my-2 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
              />
              <input
                type="text"
                name="nombrePhoto"
                value={dataSousAlbum.nombrePhoto}
                onChange={onChange}
                placeholder="Nombre de Photos"
                className="w-80 my-2 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
              />
              <label htmlFor="" className="flex flex-col">
                Ajouter dans Album :
                <select
                  onChange={onChange}
                  className="w-80 my-2 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
                  value={dataSousAlbum.album_id}
                  name="album_id"
                  id=""
                >
                  <option value=""> </option>
                  {albums.map((album) => (
                    <option value={album.id} key={album.id}>
                      {album.nom}
                    </option>
                  ))}
                </select>
              </label>
              <input
                type="file"
                onChange={onChange}
                ref={inputRef}
                name="image"
                value={dataSousAlbum.image}
              />

              <button
                type="submit"
                className="bg-black text-white p-3 rounded-lg"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSousAlbum;
