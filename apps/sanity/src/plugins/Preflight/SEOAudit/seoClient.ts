import {OnPageApi, OnPageTaskRequestInfo} from 'dataforseo-client'

const apiHost = 'https://api.dataforseo.com'
const draftApiHost = 'https://sandbox.dataforseo.com'

const authenticatedFetch =
  (apiKey: string) =>
  (url: RequestInfo, init?: RequestInit): Promise<Response> => {
    const authHeader = {Authorization: `Basic ${apiKey}`}

    const newInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        ...authHeader,
      },
    }

    return fetch(url, newInit)
  }

const getOnPageClient = (apiKey: string) => {
  return new OnPageApi(apiHost, {fetch: authenticatedFetch(apiKey)})
}

const getOnPageDraftClient = (apiKey: string) => {
  return new OnPageApi(draftApiHost, {fetch: authenticatedFetch(apiKey)})
}

export const getPageLiveResult = (apiKey: string) => async (pageURL: string, draft: boolean) => {
  const onPageClient = draft ? getOnPageDraftClient(apiKey) : getOnPageClient(apiKey)

  const task = new OnPageTaskRequestInfo({
    url: pageURL,
    max_crawl_pages: 1,
    check_spell: true,
    validate_micromarkup: true,
  })

  return onPageClient.instantPages([task])
}
