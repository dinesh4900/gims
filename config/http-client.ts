const BASE_POSTS_URL = 'http://localhost:3000'
export const postClient = async <ResultT = any, T = any>(
  urlParams: string,
  method?: 'GET' | 'POST',
  body?: T,
  token?: string
) => {
  let data = null
  let error = null

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }

    const result = await fetch(`${BASE_POSTS_URL}/${urlParams}`, {
      ...(method ? { method } : {}),
      ...(body ? { body: JSON.stringify(body) } : {}),
      headers
    })

    if (!result.ok) {
      const message = `An error has occurred: ${result.status}`
      throw new Error(message)
    }
    data = (await result.json()) as ResultT
  } catch (e) {
    error = e
  } finally {
    return {
      data,
      error
    }
  }
}
