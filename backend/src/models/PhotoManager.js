/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PhotoManager extends AbstractManager {
  constructor() {
    super({ table: "photo" });
  }

  findBySousAlbumId(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE sousalbum_id = ? `,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  insert(photo) {
    return this.connection.query(
      `insert into ${this.table} (nom, image, description, sousalbum_id) values (?,?,?,?)`,
      [photo.nom, photo.image, photo.description, photo.sousalbum_id]
    );
  }

  update(photo) {
    return this.connection.query(
      `update ${this.table} set nom = ?, descritpion = ? where id = ?`,
      [photo.nom, photo.descritpion, photo.id]
    );
  }
}

module.exports = PhotoManager;
