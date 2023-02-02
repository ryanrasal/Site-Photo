const AbstractManager = require("./AbstractManager");

class AlbumManager extends AbstractManager {
  constructor() {
    super({ table: "album" });
  }

  find(id) {
    return this.connection.query(`SELECT * FROM ${this.table} `, [id]);
  }

  insert(album) {
    return this.connection.query(
      `insert into ${this.table} (nom, image, description) values (?,?,?)`,
      [album.nom, album.image, album.description]
    );
  }

  update(album) {
    return this.connection.query(
      `update ${this.table} set nom = ?, description = ? where id = ?`,
      [album.nom, album.description, album.id]
    );
  }
}

module.exports = AlbumManager;
