// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Entries, Entrants } = initSchema(schema);

export {
  Entries,
  Entrants
};