import { env } from '@/env'

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    env?.NEXT_PUBLIC_SITE_URL && env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? env.NEXT_PUBLIC_SITE_URL
      : // If neither is set, default to localhost for local development.
        'http://localhost:3000/'

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '')
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '')

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url
}

const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description']
}

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType]

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`
  }

  return redirectPath
}

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) => getToastRedirect(path, 'error', errorName, errorDescription, disableButton, arbitraryParams)

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) => getToastRedirect(path, 'status', statusName, statusDescription, disableButton, arbitraryParams)

export function getEnvVar(varValue: string | undefined, varName: string): string {
  if (varValue === undefined) throw new ReferenceError(`Reference to undefined env var: ${varName}`)
  return varValue
}
