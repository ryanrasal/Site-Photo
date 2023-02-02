const models = require("../models");

const getAdminByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  models.admin
    .findByEmailWithPassword(email)
    .then(([admins]) => {
      if (admins[0]) {
        [req.admin] = admins;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500).send("error data from database");
    });
};

module.exports = {
  getAdminByEmailWithPasswordAndPassToNext,
};
