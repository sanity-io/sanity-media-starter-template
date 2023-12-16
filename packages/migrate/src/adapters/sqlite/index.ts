import {Database} from 'bun:sqlite'
import {join} from 'node:path'
import {initDb} from './init'
import {actions} from './sqlite'

export const sqliteClient = () => {
  const dbPath =
    process.env.SQLITE_PATH ||
    join(import.meta.dir, '..', '..', '..', 'data', `${process.env.PROJECT_NAME}.sqlite`)

  const db = new Database(dbPath, {
    // If the database schema doesn't exist, create it
    create: true,
  })

  // Ensure the database schema is up to date
  initDb(db)

  return actions(db)
}
