import { getSearchIdAction, getStopSearchAction, getTicketsAction, onErrorAction } from '../store/ticketsListReducer'

export default class AviaAPI {
  url = new URL('https://aviasales-test-api.kata.academy')

  getSearchIdThunk() {
    const newUrl = new URL('/search', this.url)

    return async (dispatch) => {
      try {
        await fetch(newUrl)
          .then((res) => res.json())
          .then((res) => dispatch(getSearchIdAction(res)))
      } catch (e) {
        if (e.name !== 'SyntaxError') dispatch(onErrorAction())
      }
    }
  }

  getTicketsThunk(searchId) {
    const newUrl = new URL('/tickets', this.url)
    newUrl.searchParams.set('searchId', searchId)

    return async (dispatch) => {
      try {
        await fetch(newUrl)
          .then((res) => res.json())
          .then((res) => dispatch(getTicketsAction(res)))
      } catch (e) {
        if (e.name !== 'SyntaxError') dispatch(onErrorAction())
      }
    }
  }

  getStopSearchThunk(searchId) {
    const newUrl = new URL('/tickets', this.url)
    newUrl.searchParams.set('searchId', searchId)

    return async (dispatch) => {
      try {
        await fetch(newUrl)
          .then((res) => res.json())
          .then((res) => dispatch(getStopSearchAction(res)))
      } catch (e) {
        if (e.name !== 'SyntaxError') dispatch(onErrorAction())
      }
    }
  }
}
