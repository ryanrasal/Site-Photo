import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import Navbar from "../../components/Navbar";
import error from "../../assets/error.png";
import flecheGauche from "../../assets/flecheGauche.png";

const { VITE_BACKEND_URL } = import.meta.env;

function Photos() {
  const { sousalbumId } = useParams();
  const [loader, setLoader] = useState(true);

  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch(`${VITE_BACKEND_URL}/api/photo/${sousalbumId}`)
      .then((response) => response.json())
      .then((result) => {
        setPhotos(result);
        setLoader(false);
      });
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="bg-black">
      <Navbar />
      <Link to="/galerie">
        <img
          src={flecheGauche}
          className="hidden md:block h-14 mt-[-70px] mb-10 ml-14"
          alt=""
        />
      </Link>
      <div className="flex flex-col pt-20 md:mt-0 pb- md:grid md:grid-cols-4 gap-10 md:ml-14 md:pb-10 md:pr-12">
        {photos.length === 0 ? (
          <img
            className=" h-[350px]  w-[400px] md:ml-[155%] mb-[262px] md:mb-[74px]"
            src={error}
            alt="Not Found"
          />
        ) : (
          photos.map((photo) => (
            <div key={photo.id}>
              <img src={`${VITE_BACKEND_URL}/uploads/${photo.image}`} alt="" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Photos;
