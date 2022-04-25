import mongoose from 'mongoose';

import { HOST_DB, NAME_DB } from '../../../config';

export default function connect() {
  mongoose
    .connect(`mongodb://${HOST_DB()}/${NAME_DB()}`)
    .then((conn) => {
      // eslint-disable-next-line no-console
      console.log('db is connected to', conn.connection.host);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('mongodb:', err);
    });
}
