import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Connexion,
  Contact,
  Galerie,
  Home,
  Layout,
  Photos,
  SousAlbum,
} from "..";

function PublicRoute() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/galerie/sousAlbum/:albumId" element={<SousAlbum />} />
          <Route
            path="/galerie/sousalbum/photo/:sousalbumId"
            element={<Photos />}
          />
          <Route path="/connexionAdmin" element={<Connexion />} />
        </Route>
      </Routes>
    </div>
  );
}

export default PublicRoute;
