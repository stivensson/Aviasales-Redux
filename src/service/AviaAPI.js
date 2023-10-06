import { getSearchIdAction, getTicketsAction, onErrorAction } from '../store/actions'

export default class AviaApi {
  url = new URL('https://aviasales-test-api.kata.academy')

  getSearchIdThunk() {
    const newUrl = new URL('/search', this.url)

    return async (dispatch) => {
      try {
        const res = await fetch(newUrl)
        if (res.ok) {
          const body = await res.json()
          dispatch(getSearchIdAction(body))
        } else {
          throw new Error(`Could not fetch ${this.url}, received ${res.status}`)
        }
      } catch (e) {
        if (e.name !== 'SyntaxError') dispatch(onErrorAction())
      }
    }
  }

  getTicketsThunk(searchId, stopSearch, onLineStatus) {
    const newUrl = new URL('/tickets', this.url)
    newUrl.searchParams.set('searchId', searchId)

    return async (dispatch) => {
      try {
        while (!stopSearch) {
          if (!onLineStatus) break
          const res = await fetch(newUrl)
          if (res.ok) {
            const body = await res.json()
            dispatch(getTicketsAction(body))
            if (body.stop) break
          } else {
            throw new Error(`Could not fetch ${this.url}, received ${res.status}`)
          }
        }
      } catch (e) {
        if (e.name !== 'SyntaxError') dispatch(onErrorAction())
      }
    }
  }
}
