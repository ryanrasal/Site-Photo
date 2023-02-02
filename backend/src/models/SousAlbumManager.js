/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class SousAlbumManager extends AbstractManager {
  constructor() {
    super({ table: "sousalbum" });
  }

  findByAlbumId(id) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE album_id = ? `,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${this.table}`);
  }

  insert(sousalbum) {
    return this.connection.query(
      `insert into ${this.table} (nom, lieu, nombrePhoto, image, album_id) values (?,?,?,?,?)`,
      [
        sousalbum.nom,
        sousalbum.lieu,
        sousalbum.nombrePhoto,
        sousalbum.image,
        sousalbum.album_id,
      ]
    );
  }

  update(sousalbum) {
    return this.connection.query(
      `update ${this.table} set nom = ?, lieu = ?, nombrePhoto = ? where id = ?`,
      [sousalbum.nom, sousalbum.lieu, sousalbum.nombrePhoto, sousalbum.id]
    );
  }
}

module.exports = SousAlbumManager;
