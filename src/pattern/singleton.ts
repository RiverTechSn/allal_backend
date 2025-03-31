// Singleton Pattern in Typescript
class Database {
    static instance: Database;
    constructor() {
      if (Database.instance) {
        return Database.instance;
      }
      Database.instance = this;
    }
  }
  const db1 = new Database();
  const db2 = new Database();
  console.log(db1 === db2); // Output: true
  