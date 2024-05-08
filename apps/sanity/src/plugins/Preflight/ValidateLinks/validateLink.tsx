import {LinkCheckResult} from '.'

export const validateLink = async (url: string): Promise<LinkCheckResult> => {
  try {
    await fetch(url, {method: 'HEAD', mode: 'no-cors'})

    return {
      status: 'success',
    }
  } catch (error) {
    console.log(error)
    return {status: 'error', message: error instanceof Error ? error.message : 'Unknown error'}
  }
}
