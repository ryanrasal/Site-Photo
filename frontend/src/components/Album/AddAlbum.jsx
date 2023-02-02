/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAlbum() {
  const [dataAlbum, setDataAlbum] = useState({
    nom: "",
    image: "",
    description: "",
  });

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const onChange = (e) => {
    setDataAlbum({
      ...dataAlbum,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataAlbum.nom && dataAlbum.image && dataAlbum.description) {
      const myHeaders = new Headers();

      const album = JSON.stringify(dataAlbum);

      const formData = new FormData();

      formData.append("album", album);
      formData.append("picture", inputRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };
      // On appelle le back. Si tous les middleware placé sur la route ci-dessous, je pourrais être renvoyé à la route login
      fetch(`http://localhost:5000/api/album`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          toast.success("Album Créé", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          navigate("/admin/album");
        })
        .catch(console.error);
    }
  };

  return (
    <div className="h-96 w-96">
      <div>
        <div className="fixed top-0 bg-white w-screen h-screen">
          <Link to="/admin/album" type="button">
            <img
              className="mt-2 ml-2 md:mt-6 md:ml-4"
              src="../src/assets/croix.png"
              alt="Close"
            />
          </Link>
          <h1 className="text-[32px] px-6 text-black font-bold text-center md:text-4xl">
            Créer un Album
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
                value={dataAlbum.nom}
                onChange={onChange}
                placeholder="Nom de l'Album"
                className="w-80 my-4 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
              />
              <input
                type="file"
                onChange={onChange}
                ref={inputRef}
                name="image"
                value={dataAlbum.image}
                className="my-4"
              />
              <input
                type="text"
                name="description"
                value={dataAlbum.description}
                onChange={onChange}
                placeholder="Description"
                className="w-80 my-4 rounded-md placeholder:text-gray-300 border border-primary py-2 pl-4 text-lg placeholder-black"
              />
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

export default AddAlbum;
