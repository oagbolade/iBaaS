/* eslint-disable no-console */
const sql = require('mssql');

// Database configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  trustServerCertificate: true // change to true for local dev / self-signed certs
};

// Function to execute SQL queries
export const executeQuery = async (query) => {
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    console.log(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await sql.close();
  }
};
