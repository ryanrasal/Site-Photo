import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import croix from "../../assets/croix.png";

function EditAlbum() {
  const [dataAlbum, setDataAlbum] = useState({
    nom: "",
    description: "",
  });

  const onChange = (e) => {
    setDataAlbum({
      ...dataAlbum,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const { albumId } = useParams();

  const onSubmit = (e) => {
    e.preventDefault();

    if (dataAlbum.nom && dataAlbum.description) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify(dataAlbum);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body,
      };
      // On appelle le back. Si tous les middleware placé sur la route ci-dessous, je pourrais être renvoyé à la route login
      fetch(`http://localhost:5000/api/album/${albumId}`, requestOptions)
        .then((response) => response.text())
        .then(() => {
          toast.success(`Album ${dataAlbum.nom} modifié `, {
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
    <div className="bg-white h-screen">
      <div className="fixed top-0  w-screen h-screen">
        <Link to="/admin/album" type="button">
          <img className="mt-2 ml-2 md:mt-6 md:ml-4" src={croix} alt="Close" />
        </Link>
        <h1 className="text-[40px] text-[#15133C] font-bold text-center pb-8 mt-8">
          Modifier Album
        </h1>
        <form
          onSubmit={onSubmit}
          method="PUT"
          className=" flex flex-col justify-center  items-center"
        >
          <label className="flex flex-col text-xl mb-2">
            Nom
            <input
              className="w-80 rounded-md border border-primary py-2 pl-4 text-lg placeholder-black"
              type="text"
              name="nom"
              placeholder="Nom de l'album"
              value={dataAlbum.nom}
              onChange={onChange}
            />
          </label>
          <label className="flex flex-col text-xl mb-2">
            Description
            <input
              className="w-80 rounded-md border border-primary py-2 pl-4 text-lg placeholder-black"
              type="text"
              placeholder="description"
              name="description"
              value={dataAlbum.description}
              onChange={onChange}
            />
          </label>

          <button
            type="submit"
            className="bg-black text-white p-3 md:px-10 rounded-lg"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAlbum;
