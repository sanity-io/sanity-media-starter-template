'use server';

/**
 * !!! DO NOT USE THIS IN PRODUCTION !!!
 * This is purely for demonstration purposes.
 *
 * For ease of deployment, we are using in-browser local storage and simple cookies
 * to manage the user's session and other data.
 */

import { cookies } from 'next/headers';

/**
 * A simple boolean value in a cookie to track if the user is subscribed or not.
 */
export const setUserSession = async () => {
  cookies().set('session', 'true');
};

/**
 * Check if the user is subscribed.
 * We use a simple boolean value in a cookie to track this
 */
export const isSubscribed = async () => {
  return cookies().get('session')?.value === 'true';
};
