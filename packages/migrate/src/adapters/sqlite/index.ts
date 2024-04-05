import {Database} from 'bun:sqlite'
import {join} from 'node:path'
import {mkdir} from 'node:fs/promises'
import {initDb} from './init'
import {actions} from './sqlite'

export const sqliteClient = async () => {
  // Create the data directory if it doesn't exist
  const dataDir = join(import.meta.dir, '..', '..', '..', 'data')
  await mkdir(dataDir, {recursive: true})

  const dbPath = process.env.SQLITE_PATH || join(dataDir, `${process.env.PROJECT_NAME}.sqlite`)

  const db = new Database(dbPath, {
    // If the database schema doesn't exist, create it
    create: true,
  })

  // Ensure the database schema is up to date
  initDb(db)

  return actions(db)
}
