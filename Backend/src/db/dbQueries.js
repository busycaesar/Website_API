const pool = require("./db");
const fs = require("fs");

const createTables = () => {
  return new Promise((resolve, reject) => {
    const createTableQuery = fs.readFileSync("src/db/tables.sql", "utf8");
    pool
      .query(createTableQuery)
      .then(() => resolve("All tables created."))
      .catch((error) =>
        reject(
          new Error(
            `Database error while creating all the tables. ${error.message}`
          )
        )
      );
  });
};

const cleanTable = () => {
  return new Promise((resolve, reject) => {
    const dropTablesQuery = 'DELETE FROM "user";';
    pool
      .query(dropTablesQuery)
      .then(() => {
        resolve();
      })
      .catch(() =>
        reject(new Error("Database error while clearning all the tables."))
      );
  });
};

const getUserInfo = (userId) => {
  return new Promise((resolve, reject) => {
    const getUserInfoQuery = `SELECT firstname, lastname, username, email
                              FROM "user"
                              WHERE id = $1;`;

    pool
      .query(getUserInfoQuery, [userId])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No user found with id ${userId}.`));
        const { firstname, lastname, username, email } = result.rows[0];
        resolve({
          firstName: firstname,
          lastName: lastname,
          username: username,
          email: email,
        });
      })
      .catch((error) =>
        reject(new Error(`Error getting the user password: ${error}`))
      );
  });
};

const addNewUser = (firstName, lastName, username, email, authId) => {
  return new Promise((resolve, reject) => {
    const insertUserQuery = `
        INSERT INTO "user" (firstname, lastname, username, email, authid)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
        `;

    pool
      .query(insertUserQuery, [firstName, lastName, username, email, authId])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`Database error while creating a new user.`));
        const { id } = result.rows[0];
        resolve(id);
      })
      .catch((error) =>
        reject(new Error(`Database error while adding ${username}`, error))
      );
  });
};

const addUniqueUserAPIKey = (userId, uniqueAPIKey) => {
  return new Promise((resolve, reject) => {
    const addUniqueUserAPIKeyQuery = `
          INSERT INTO "userapikey" (userid, apikey)
          VALUES ($1, $2);
          `;

    pool
      .query(addUniqueUserAPIKeyQuery, [userId, uniqueAPIKey])
      .then((result) => {
        if (!result.rowCount)
          reject(
            new Error(
              `Database error while adding unique API key for the new user.`
            )
          );
        resolve();
      })
      .catch((error) =>
        reject(
          new Error(`Database error while adding API keys for ${userId}`, error)
        )
      );
  });
};

const addUserAPIKeys = (userId) => {
  return new Promise((resolve, reject) => {
    const addUserAPIKeysQuery = `
          INSERT INTO "apikeys" (userid)
          VALUES ($1);
          `;

    pool
      .query(addUserAPIKeysQuery, [userId])
      .then((result) => {
        if (!result.rowCount)
          reject(
            new Error(`Database error while adding API keys for the new user.`)
          );
        resolve();
      })
      .catch((error) =>
        reject(
          new Error(`Database error while adding API keys for ${userId}`, error)
        )
      );
  });
};

const getUserAPIKeys = (userId) => {
  return new Promise((resolve, reject) => {
    const getUserAPIKeysQuery = `SELECT *
                                 FROM "apikeys"
                                 WHERE userid = $1;`;

    pool
      .query(getUserAPIKeysQuery, [userId])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No user found with id ${userId}.`));

        const { github, linkedin, youtube, devto } = result.rows[0];

        resolve({
          GitHub: github,
          LinkedIn: linkedin,
          YouTube: youtube,
          Devto: devto,
        });
      })
      .catch((error) =>
        reject(
          new Error(
            `Database error while getting API keys for ${userId}`,
            error
          )
        )
      );
  });
};

const getUserId = (username) => {
  return new Promise((resolve, reject) => {
    const getUserIdQuery = `SELECT id
                            FROM "user"
                            WHERE username = $1;`;

    pool
      .query(getUserIdQuery, [username])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No user found with ${username}.`));

        const { id } = result.rows[0];
        resolve(id);
      })
      .catch((error) =>
        reject(
          new Error(
            `Database error while getting the user id for ${username}.`,
            error
          )
        )
      );
  });
};

const updateUserAPIKeys = (userId, github, linkedin, youtube, devto) => {
  return new Promise((resolve, reject) => {
    const updateUserAPIKeysQuery = `
        UPDATE "apikeys" 
        SET github   = $1,
            linkedin = $2,
            youtube  = $3,
            devto    = $4
        WHERE userid = $5;
        `;

    pool
      .query(updateUserAPIKeysQuery, [github, linkedin, youtube, devto, userId])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No user found with id ${userId}.`));
        resolve(`${userId}'s API key/s are updated.`);
      })
      .catch((error) => {
        reject(
          new Error(
            `Database error while updathing ${userId} API keys. ${error}`
          )
        );
      });
  });
};

const updateUser = (id, username) => {
  return new Promise((resolve, reject) => {
    const updateUserQuery = `
        UPDATE "user" 
        SET username = $1
        WHERE id = $2;
        `;

    pool
      .query(updateUserQuery, [username, id])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with id ${id}.`));
        resolve(`${username}'s username is updated.`);
      })
      .catch((error) => {
        reject(
          new Error(`Database error while updathing ${username}. ${error}`)
        );
      });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const deleteUserQuery = `
    DELETE FROM "user" 
    WHERE id=${id};
    `;
    pool
      .query(deleteUserQuery)
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`Database error. No user found with ${id}.`));
        resolve(`User ${id} deleted successfully.`);
      })
      .catch((error) =>
        reject(new Error(`Database error while deleting the user. ${error}`))
      );
  });
};

const dbHealthCheck = () => {
  return new Promise((resolve, reject) => {
    const healthCheckQuery = `SELECT CURRENT_TIMESTAMP as health_check_time;`;
    pool
      .query(healthCheckQuery)
      .then((result) => resolve(result.rows[0].health_check_time))
      .catch((error) =>
        reject(new Error(`Database error while health check. ${error}`))
      );
  });
};

module.exports = {
  createTables,
  addNewUser,
  addUserAPIKeys,
  getUserAPIKeys,
  dbHealthCheck,
  deleteUser,
  updateUser,
  getUserInfo,
  cleanTable,
  updateUserAPIKeys,
  addUniqueUserAPIKey,
  getUserId,
};
