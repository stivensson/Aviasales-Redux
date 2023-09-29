/* eslint-disable indent */

import uniqid from 'uniqid'

const GET_SEARCH_ID = 'GET_SEARCH_ID'
const GET_TICKETS = 'GET_TICKETS'
const GET_STOP_SEARCH = 'GET_STOP_SEARCH'
const ADD_TICKETS = 'ADD_TICKETS'
const SORT_CHEAP = 'SORT_CHEAP'
const SORT_FAST = 'SORT_FAST'
const ON_ERROR = 'ON_ERROR'

const defaultState = {
  ticketsData: [],
  searchId: null,
  stopSearch: null,
  index: 0,
  sortCheap: false,
  sortFast: false,
  onError: false,
}

export const ticketsListReducer = (state = defaultState, action) => {
  if (action.type === GET_TICKETS) {
    const tickets = action.payload.tickets.map((item) => ({ id: uniqid(), ...item }))
    return {
      ...state,
      ticketsData: [...tickets, ...state.ticketsData],
    }
  }

  switch (action.type) {
    case GET_SEARCH_ID:
      return { ...state, searchId: action.payload.searchId }

    case GET_STOP_SEARCH:
      return { ...state, stopSearch: action.payload.stop }

    case ADD_TICKETS:
      return { ...state, index: state.index + 5 }

    case ON_ERROR:
      return { ...state, onError: true }

    case SORT_CHEAP:
      return { ...state, sortCheap: true, sortFast: false }

    case SORT_FAST:
      return { ...state, sortFast: true, sortCheap: false }

    default:
      return state
  }
}

export const getSearchIdAction = (payload) => ({ type: GET_SEARCH_ID, payload })

export const getTicketsAction = (payload) => ({ type: GET_TICKETS, payload })

export const getStopSearchAction = (payload) => ({ type: GET_STOP_SEARCH, payload })

export const onErrorAction = () => ({ type: ON_ERROR })

export const addTicketsAction = () => ({ type: ADD_TICKETS })

export const sortCheapAction = () => ({ type: SORT_CHEAP })

export const sortFastAction = () => ({ type: SORT_FAST })
