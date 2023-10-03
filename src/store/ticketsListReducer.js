/* eslint-disable indent */

import { GET_SEARCH_ID, GET_TICKETS, ADD_TICKETS, SORT_CHEAP, SORT_FAST, ON_ERROR } from './types'

const defaultState = {
  ticketsData: [],
  searchId: null,
  stopSearch: false,
  index: 0,
  sortCheap: false,
  sortFast: false,
  onError: false,
}

export const ticketsListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        stopSearch: action.payload.stop,
        ticketsData: [...action.payload.tickets, ...state.ticketsData],
      }

    case GET_SEARCH_ID:
      return { ...state, searchId: action.payload.searchId }

    case ADD_TICKETS:
      return { ...state, index: state.index + 5 }

    case ON_ERROR:
      return { ...state, onError: false }

    case SORT_CHEAP:
      return { ...state, sortCheap: true, sortFast: false }

    case SORT_FAST:
      return { ...state, sortFast: true, sortCheap: false }

    default:
      return state
  }
}
