/* eslint-disable new-cap */
import { Sequelize, Dialect } from 'sequelize';

import { DIALECT_DB, HOST_DB, NAME_DB, PASS_DB, STAGE, USER_DB } from '../../../config';

let dbConnection: Sequelize | null = null;

/**
 * Connect to db from Sequelize
 * @return {Sequelize} Sequelize db connection
 */
export default function connect(): Sequelize {
  if (!dbConnection) {
    dbConnection = new Sequelize(NAME_DB(), USER_DB(), PASS_DB(), {
      host: HOST_DB(),
      dialect: DIALECT_DB() as Dialect,
      // eslint-disable-next-line no-console
      logging: STAGE() === 'development' ? console.log : false,
    });
    // dbConnection.sync();
  }

  return dbConnection;
}
