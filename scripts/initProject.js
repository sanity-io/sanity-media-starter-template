// run Sanity init
// wait for user to link to Sanity project
// get paths to relevant .env files
// update .env with Sanity project ID and dataset
// copy .env.example to .env
//

const {spawn} = require('node:child_process')

const subprocess = spawn('npx', ['sanity', 'init', '--bare'], {
  stdio: ['inherit', 'pipe', 'inherit'],
})

let messageCount = 0
let sanityProjectId = ''
let sanityDataset = ''

subprocess.stdout.on('data', (data) => {
  messageCount += 1

  if (messageCount > 6) {
    console.clear()
  }

  console.log(`${data}`)

  if (data.includes('Project ID:')) {
    const result = data.toString()
    sanityProjectId = result.match(/Project ID: (.*)/)[1]
    sanityDataset = result.match(/Dataset: (.*)/)[1]

    updatePackageEnvs(sanityProjectId, sanityDataset)
  }
})

const fs = require('fs')
const path = require('path')

function updateEnv(projectId, datasetName, packageRoot) {
  console.log('Updating .env file in', packageRoot)

  const envExamplePath = path.resolve(packageRoot, '.env.example')
  const envPath = path.resolve(packageRoot, '.env')

  if (!fs.existsSync(envPath)) {
    // Clone .env.example to .env
    fs.copyFileSync(envExamplePath, envPath)
  }

  const env = fs.readFileSync(envPath, 'utf8')
  const updatedEnv = env
    .replace(/NEXT_PUBLIC_SANITY_PROJECT_ID=.*/, `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}`)
    .replace(/SANITY_STUDIO_PROJECT_ID=.*/, `SANITY_STUDIO_PROJECT_ID=${projectId}`)
    .replace(/NEXT_PUBLIC_SANITY_DATASET=.*/, `NEXT_PUBLIC_SANITY_DATASET=${datasetName}`)
    .replace(/SANITY_STUDIO_DATASET=.*/, `SANITY_STUDIO_DATASET=${datasetName}`)

  fs.writeFileSync(envPath, updatedEnv)
}

function updatePackageEnvs(projectId, datasetName) {
  console.log('Updating package env variables')
  updateEnv(projectId, datasetName, path.resolve(__dirname, '..', 'packages', 'site'))
  updateEnv(projectId, datasetName, path.resolve(__dirname, '..', 'packages', 'sanity'))
  updateEnv(projectId, datasetName, path.resolve(__dirname, '..', 'packages', 'migrate'))
}
