import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => this.#persist());
  }

  #persist() {
    //metodo para escrever o bd em um json
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];

    return data;
  }
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
    return data;
  }
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      let created_at = this.#database[table][rowIndex]['created_at'];
      let completed_at = this.#database[table][rowIndex]['completed_at'];
      const { title, description, updated_at } = data;
      if (title) {
        let description = this.#database[table][rowIndex]['description'];
        this.#database[table][rowIndex] = {
          id,
          created_at,
          title,
          description,
          completed_at,
          updated_at,
        };
      }
      if (description) {
        let title = this.#database[table][rowIndex]['title'];
        this.#database[table][rowIndex] = {
          id,
          created_at,
          title,
          description,
          completed_at,
          updated_at,
        };
      }

      this.#persist();
    }
  }
  patch(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      //const completed_at = new Date();

      this.#database[table][rowIndex] = {
        id,
        created_at: this.#database[table][rowIndex]['created_at'],
        title: this.#database[table][rowIndex]['title'],
        description: this.#database[table][rowIndex]['description'],
        completed_at: new Date(),
        updated_at: this.#database[table][rowIndex]['updated_at'],
      };

      this.#persist();
    }
  }
}
