import { getSearchIdAction, getStopSearchAction, getTicketsAction, onErrorAction } from '../store/ticketsListReducer'

export default class AviaAPI {
  url = new URL('https://aviasales-test-api.kata.academy')

  resStatus(res, url) {
    if (!res.ok) throw new Error(`Could not fetch ${url}, received ${res.status}`)

    return res.json()
  }

  getSearchIdThunk() {
    const newUrl = new URL('/search', this.url)

    return async (dispatch) => {
      try {
        await fetch(newUrl)
          .then((res) => this.resStatus(res, newUrl))
          .then((res) => dispatch(getSearchIdAction(res)))
      } catch (e) {
        dispatch(onErrorAction())
      }
    }
  }

  getTicketsThunk(searchId) {
    const newUrl = new URL('/tickets', this.url)
    newUrl.searchParams.set('searchId', searchId)

    return async (dispatch) => {
      try {
        await fetch(newUrl)
          .then((res) => this.resStatus(res, newUrl))
          .then((res) => dispatch(getTicketsAction(res)))
      } catch (e) {
        dispatch(onErrorAction())
      }
    }
  }

  getStopSearchThunk(searchId) {
    const newUrl = new URL('/tickets', this.url)
    newUrl.searchParams.set('searchId', searchId)

    return async (dispatch) => {
      await fetch(newUrl)
        .then((res) => this.resStatus(res, newUrl))
        .then((res) => dispatch(getStopSearchAction(res)))
    }
  }
}
