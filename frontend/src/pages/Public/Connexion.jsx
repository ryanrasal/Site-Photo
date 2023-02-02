/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../App.css";
import { useCurrentAdminContext } from "../../context/AdminContext";
import Cadena from "../../assets/Cadena.png";

function Connexion() {
  const { setToken, setAdmin, setLogged } = useCurrentAdminContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      email,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    /* submit mail and password, post to back and get the result
  if ok -> navigate to the home page
  */
    if (email && password) {
      // on appelle le back
      fetch("http://localhost:5000/api/login", requestOptions)
        .then((response) => {
          // Si la réponse est un statut 401 : ça déclenche une erreur sinon ça renvoit la réponse au format JSON
          if (response.status === 401) {
            throw new Error("admin incorrect");
          } else return response.json();
        })
        .then((result) => {
          console.warn(result);
          setAdmin(result.admin);
          setToken(result.token);
          setLogged(true);
          navigate("/admin/album");
        })
        .catch(console.error);
    } else {
      setErrorMessage("Please specify email and password");
    }
  };
  return (
    <div className="w-full h-screen bg-center bg-cover bg-header bg-fit ">
      <Navbar />
      <div className="md:h-96 w-[80vw] flex flex-col items-center h-screen justify-center  md:w-[30vw] md:bg-white md:bg-opacity-70 text-4xl  font-[body] rounded-md  text-center mx-auto">
        <img className="h-28 mx-auto py-6" src={Cadena} alt="" />
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="email"
            pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            className="bg-gray-200 text-gray-600 text-xl py-2 my-4 px-4 border rounded-2xl md:w-3/5 h-10 w-56 md:h-14"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="Enter your password"
            className="bg-gray-200  text-gray-600 text-xl py-2 px-4 border rounded-2xl md:w-3/5 h-10 w-56 md:h-14"
          />
          <button
            type="submit"
            className="bg-[#15133C] mt-10 md:mt-6 text-xl text-white m-3  px-4 rounded-lg shadow-lg h-16 md:h-14 w-56 md:text-lg hover:shadow hover:bg-[#FFFFFF] hover:text-[#15133C] hover:border hover:border-[#15133C]"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
