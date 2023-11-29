import * as documentTypes from './documents';
import * as objectTypes from './objects';

export const schemaTypes = [
  ...Object.values(documentTypes),
  ...Object.values(objectTypes),
];
