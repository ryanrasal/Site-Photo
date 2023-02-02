const AbstractManager = require("./AbstractManager");

class adminManager extends AbstractManager {
  constructor() {
    super({ table: "admin" });
  }

  findByEmailWithPassword(email) {
    return this.connection.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
  }

  insert(admin) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, email, password) values (?, ?, ?, ?)`,
      [admin.firstname, admin.lastname, admin.email, admin.hashedPassword]
    );
  }

  update(admin) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, password = ? where id = ?`,
      [admin.firstname, admin.lastname, admin.email, admin.password]
    );
  }
}

module.exports = adminManager;
