import { Route, Routes } from "react-router-dom";
import React from "react";
import { AddAlbum, AddPhoto, AddSousAlbum, EditAlbum } from "../../components";
import { AdminAlbum, AdminPhoto, AdminSousAlbum } from "..";
import LayoutAdmin from "./LayoutAdmin";

function PrivateRoute() {
  return (
    <div>
      <Routes>
        <Route element={<LayoutAdmin />}>
          <Route path="album" element={<AdminAlbum />} />
          <Route path="AddAlbum" element={<AddAlbum />} />
          <Route path="AddSousAlbum" element={<AddSousAlbum />} />
          <Route path="sousalbum" element={<AdminSousAlbum />} />
          <Route path="photo" element={<AdminPhoto />} />
          <Route path="AddPhoto" element={<AddPhoto />} />
          <Route path="editAlbum/:albumId" element={<EditAlbum />} />
        </Route>
      </Routes>
    </div>
  );
}

export default PrivateRoute;
