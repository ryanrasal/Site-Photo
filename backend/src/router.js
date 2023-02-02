const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: process.env.UPLOADS_FOLDER });

const { hashPassword, verifyPassword } = require("./services/auth");

const fileControllers = require("./controllers/fileControllers");

const albumControllers = require("./controllers/albumControllers");
// Routes pour Album
router.get("/api/album", albumControllers.browse);
router.get("/api/album/:id", albumControllers.read);
router.put("/api/album/:id", albumControllers.edit);
router.post(
  "/api/album",
  upload.single("picture"),
  fileControllers.fileRename,
  albumControllers.add
);
router.delete("/api/album/:id", albumControllers.destroy);

const sousAlbumControllers = require("./controllers/sousAlbumControllers");
// Routes pour SousAlbum
router.get("/api/sousAlbum", sousAlbumControllers.browse);
router.get("/api/sousAlbum/:id", sousAlbumControllers.read);
router.put("/api/sousAlbum/:id", sousAlbumControllers.edit);
router.post(
  "/api/sousAlbum",
  upload.single("picture"),
  fileControllers.fileRename,
  sousAlbumControllers.add
);
router.delete("/api/sousAlbum/:id", sousAlbumControllers.destroy);

const photoControllers = require("./controllers/photoControllers");
// Routes pour Photo
router.get("/api/photo", photoControllers.browse);
router.get("/api/photo/:id", photoControllers.read);
router.put("/api/photo/:id", photoControllers.edit);
router.post(
  "/api/photo",
  upload.single("picture"),
  fileControllers.fileRename,
  photoControllers.add
);
router.delete("/api/photo/:id", photoControllers.destroy);

const adminControllers = require("./controllers/adminControllers");
// Route pour creer un admin
router.post("/api/admin", hashPassword, adminControllers.add);
// Route pour chercher un admin
router.get("/api/admin", adminControllers.browse);

router.post("/api/register", hashPassword, adminControllers.register);

const authControllers = require("./controllers/authControllers");

router.post(
  "/api/login",
  authControllers.getAdminByEmailWithPasswordAndPassToNext,
  verifyPassword
);
module.exports = router;
