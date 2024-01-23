// run Sanity init
// wait for user to link to Sanity project
// get paths to relevant .env files
// update .env with Sanity project ID and dataset
// copy .env.example to .env

const fs = require('fs')
const path = require('path')
const {spawn} = require('node:child_process')

const subprocess = spawn('npx', ['sanity', 'init', '--bare'], {
  stdio: ['inherit', 'pipe', 'inherit'],
  shell: true,
})

subprocess.stdout.pipe(process.stdout)

let sanityProjectId = ''
let sanityDataset = ''

subprocess.stdout.on('data', (data) => {
  try {
    if (data.includes('Project ID:') || data.includes('Dataset:')) {
      const result = data.toString()

      const sanityProjectMatch = result.match(/Project ID: (.*)/)
      const sanityDatasetMatch = result.match(/Dataset: (.*)/)

      sanityProjectId = sanityProjectMatch ? sanityProjectMatch[1] : sanityProjectId
      sanityDataset = sanityDatasetMatch ? sanityDatasetMatch[1] : sanityDataset
    }
  } catch (error) {
    console.log('Something went wrong, please try again.')
    console.log(error)
  }
})

subprocess.on('close', (code) => {
  if (code === 0) {
    updatePackageEnvs(sanityProjectId, sanityDataset)
  } else {
    console.log('Something went wrong, please try again.')
  }
})

function updateEnv(projectId, datasetName, packageRoot) {
  console.log('Updating .env file in', packageRoot)

  const envExamplePath = path.resolve(packageRoot, '.env.example')
  const envPath = path.resolve(packageRoot, '.env')

  if (!fs.existsSync(envPath)) {
    // Clone .env.example to .env
    fs.copyFileSync(envExamplePath, envPath)
  }

  let env = fs.readFileSync(envPath, 'utf8')

  if (projectId) {
    env = env
      .replace(/NEXT_PUBLIC_SANITY_PROJECT_ID=.*/, `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}`)
      .replace(/SANITY_STUDIO_PROJECT_ID=.*/, `SANITY_STUDIO_PROJECT_ID=${projectId}`)
  }

  if (datasetName) {
    env = env
      .replace(/NEXT_PUBLIC_SANITY_DATASET=.*/, `NEXT_PUBLIC_SANITY_DATASET=${datasetName}`)
      .replace(/SANITY_STUDIO_DATASET=.*/, `SANITY_STUDIO_DATASET=${datasetName}`)
  }

  fs.writeFileSync(envPath, env)
}

function updatePackageEnvs(projectId, datasetName) {
  if (!projectId) {
    throw new Error('Could not parse Sanity project ID.\nPlease try again.')
  }

  if (!datasetName) {
    throw new Error('Could not parse Sanity dataset name.\nPlease try again.')
  }

  console.log('Updating package env variables')
  updateEnv(projectId, datasetName, path.resolve(__dirname, '..', 'packages', 'site'))
  updateEnv(projectId, datasetName, path.resolve(__dirname, '..', 'packages', 'sanity'))
  updateEnv(projectId, datasetName, path.resolve(__dirname, '..', 'packages', 'migrate'))
}
