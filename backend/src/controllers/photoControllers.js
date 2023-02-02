const models = require("../models");

const browse = (req, res) => {
  models.photo
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.photo
    .findBySousAlbumId(req.params.id)
    .then(([photos]) => {
      res.send(photos);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const photo = req.body;

  // TODO validations (length, format...)

  photo.id = parseInt(req.params.id, 10);

  models.photo
    .update(photo)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const photo = JSON.parse(req.body.photo);
  photo.image = req.renamedFile;

  // TODO validations (length, format...)

  models.photo
    .insert(photo)
    .then(([result]) => {
      res.location(`/photos/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.photo
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
