import { LinkCheckResult } from '.';

export const validateLink = async (url: string): Promise<LinkCheckResult> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    return {
      status: response.ok ? 'success' : 'error',
      message: `${response.status} ${response.statusText}`,
    };
  } catch (error) {
    console.log(error);
    return { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' };
  }
};
