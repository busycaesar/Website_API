const pool = require("./db");
const {
  createTables,
  addNewUser,
  dbHealthCheck,
  deleteUser,
  updateUser,
  getUserInfo,
  cleanTable,
  addUserAPIKeys,
  getUserAPIKeys,
  updateUserAPIKeys,
  addUniqueUserAPIKey,
  getUserId,
} = require("./dbQueries");

module.exports = {
  pool,
  createTables,
  addNewUser,
  dbHealthCheck,
  deleteUser,
  updateUser,
  getUserInfo,
  cleanTable,
  addUserAPIKeys,
  getUserAPIKeys,
  updateUserAPIKeys,
  addUniqueUserAPIKey,
  getUserId,
};
