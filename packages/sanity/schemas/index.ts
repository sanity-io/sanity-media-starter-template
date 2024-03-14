import * as documentTypes from './documents'
import * as objectTypes from './objects'
import {premiumContent} from './fields/premiumContent'

export const schemaTypes = [
  ...Object.values(documentTypes),
  ...Object.values(objectTypes),
  premiumContent,
]
