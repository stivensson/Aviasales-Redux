import { getSearchIdAction, getTicketsAction, onErrorAction, onAlertAction } from '../store/actions'

export default class AviaApi {
  url = new URL('https://aviasales-test-api.kata.academy')

  getSearchIdThunk(searchId, stopSearch) {
    if (!searchId) {
      return async (dispatch) => {
        const newUrl = new URL('/search', this.url)

        try {
          const res = await fetch(newUrl)
          if (res.ok) {
            const body = await res.json()
            dispatch(getSearchIdAction(body))
          } else {
            if (res.status < 200 || (res.status >= 300 && res.status < 500)) dispatch(onAlertAction())
            throw new Error(`Could not fetch ${this.url}, received ${res.status}`)
          }
        } catch (e) {
          if (e.name !== 'SyntaxError') dispatch(onErrorAction())
        }
      }
    }

    return async (dispatch) => {
      const newUrl = new URL('/tickets', this.url)
      newUrl.searchParams.set('searchId', searchId)

      try {
        while (!stopSearch) {
          const res = await fetch(newUrl)
          if (res.ok) {
            const body = await res.json()
            dispatch(getTicketsAction(body))
            if (body.stop) break
          } else if (res.status === 500) {
            const res = await fetch(newUrl)

            const body = await res.json()
            dispatch(getTicketsAction(body))
          } else {
            if (res.status < 200 || (res.status >= 300 && res.status < 500)) dispatch(onAlertAction())
            throw new Error(`Could not fetch ${this.url}, received ${res.status}`)
          }
        }
      } catch (e) {
        if (e.name !== 'SyntaxError') dispatch(onErrorAction())
      }
    }
  }
}
