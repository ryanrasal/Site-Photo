const models = require("../models");

const browse = (req, res) => {
  models.sousalbum
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
  models.sousalbum
    .findByAlbumId(req.params.id)
    .then(([sousalbums]) => {
      res.send(sousalbums);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const sousalbum = req.body;

  // TODO validations (length, format...)

  sousalbum.id = parseInt(req.params.id, 10);

  models.sousalbum
    .update(sousalbum)
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
  const sousalbum = JSON.parse(req.body.sousalbum);
  sousalbum.image = req.renamedFile;

  // TODO validations (length, format...)

  models.sousalbum
    .insert(sousalbum)
    .then(([result]) => {
      res.location(`/sousalbums/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.sousalbum
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
