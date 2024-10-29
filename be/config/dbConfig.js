const sql = require("mssql");

const config = {
  server: "localhost",
  database: "master",
  user: "SA",
  password: "MyStrongPass123",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const checkConnectDatabase = async (app) => {
    try {
      const pool = await sql.connect(config)
      console.log("Connection database successfully.");
      return pool
    } catch (error) {
      console.error("Unable to connect to the database: ", error);
      console.log("[DB] Reconnecting to database in 5 seconds")
      await new Promise(resolve => setTimeout(resolve, 5000));
      await checkConnectDatabase();
    }
  };

module.exports = {
  checkConnectDatabase,
  config
};