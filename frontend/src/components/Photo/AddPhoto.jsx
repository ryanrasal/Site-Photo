/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { VITE_BACKEND_URL } = import.meta.env;

function AddPhoto() {
  const [sousAlbums, setSousAlbums] = useState([]);

  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/sousAlbum/`)
      .then((response) => response.json())
      .then((result) => {
        console.warn(result);
        setSousAlbums(result);
      });
  }, []);

  const [dataPhoto, setDataPhoto] = useState({
    nom: "",
    image: "",
    description: "",
    sousalbum_id: "",
  });

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const onChange = (e) => {
    setDataPhoto({
      ...dataPhoto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      dataPhoto.nom &&
      dataPhoto.image &&
      dataPhoto.description &&
      dataPhoto.sousalbum_id
    ) {
      const myHeaders = new Headers();

      const photo = JSON.stringify(dataPhoto);

      const formData = new FormData();

      formData.append("photo", photo);
      formData.append("picture", inputRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };
      // On appelle le back. Si tous les middleware placé sur la route ci-dessous, je pourrais être renvoyé à la route login
      fetch(`http://localhost:5000/api/photo`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          toast.success(`Photo ${dataPhoto.nom} créée`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          navigate("/admin/photo");
        })
        .catch(console.error);
    }
  };

  return (
    <div className="absolute h-96 w-96">
      <div>
        <div className="fixed top-0 overflow-y-scroll bg-white w-screen h-screen">
          <Link to="/admin/photo" type="button">
            <img
              className="mt-2 ml-2 md:mt-6 md:ml-4"
              src="../src/assets/croix.png"
              alt="Close"
            />
          </Link>
          <h1 className="text-[32px] px-6 text-black font-bold text-center md:text-4xl">
            Créer une photo
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
                value={dataPhoto.nom}
                onChange={onChange}
                placeholder="Nom de la photo"
                className="w-80 my-2 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
              />
              <input
                type="file"
                onChange={onChange}
                ref={inputRef}
                name="image"
                value={dataPhoto.image}
              />
              <input
                type="text"
                name="description"
                value={dataPhoto.description}
                onChange={onChange}
                placeholder="Description"
                className="w-80 my-2 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
              />
              <label htmlFor="" className="flex flex-col">
                Ajouter dans Sous Album :
                <select
                  onChange={onChange}
                  className="w-80 my-2 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
                  value={dataPhoto.sousalbum_id}
                  name="sousalbum_id"
                  id=""
                >
                  <option value=""> </option>
                  {sousAlbums.map((sousAlbum) => (
                    <option value={sousAlbum.id} key={sousAlbum.id}>
                      {sousAlbum.nom}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="bg-black text-white p-3 rounded-lg"
              >
                {" "}
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPhoto;
