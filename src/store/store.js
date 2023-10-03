import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { ticketsListReducer } from './ticketsListReducer'
import { filtersBoxReducer } from './filtersBoxReducer'
import { appReducer } from './appReducer'

const rootReducer = combineReducers({
  app: appReducer,
  filtersBox: filtersBoxReducer,
  ticketsList: ticketsListReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
