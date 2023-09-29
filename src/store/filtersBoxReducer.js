const CHECK_ALL = 'CHECK_ALL'
const NO_CHECK_ALL = 'NO_CHECK_ALL'
const CHECK_WITHOUT = 'CHECK_WITHOUT'
const NO_CHECK_WITHOUT = 'NO_CHECK_WITHOUT'
const CHECK_ONE = 'CHECK_ONE'
const NO_CHECK_ONE = 'NO_CHECK_ONE'
const CHECK_TWO = 'CHECK_TWO'
const NO_CHECK_TWO = 'NO_CHECK_TWO'
const CHECK_THREE = 'CHECK_THREE'
const NO_CHECK_THREE = 'NO_CHECK_THREE'

const defaultState = {
  allCheck: true,
  withoutCheck: true,
  oneCheck: true,
  twoCheck: true,
  threeCheck: true,
}

export const filtersBoxReducer = (state = defaultState, action) => {
  if (action.type === CHECK_ALL)
    return {
      allCheck: true,
      withoutCheck: true,
      oneCheck: true,
      twoCheck: true,
      threeCheck: true,
    }

  if (action.type === NO_CHECK_ALL)
    return {
      allCheck: false,
      withoutCheck: false,
      oneCheck: false,
      twoCheck: false,
      threeCheck: false,
    }

  if (action.type === CHECK_WITHOUT && state.oneCheck && state.twoCheck && state.threeCheck && !state.allCheck)
    return {
      ...state,
      allCheck: true,
      withoutCheck: true,
    }

  if (action.type === CHECK_WITHOUT)
    return {
      ...state,
      withoutCheck: true,
    }

  if (action.type === NO_CHECK_WITHOUT && state.allCheck)
    return {
      ...state,
      allCheck: false,
      withoutCheck: false,
    }

  if (action.type === NO_CHECK_WITHOUT)
    return {
      ...state,
      withoutCheck: false,
    }

  if (action.type === CHECK_ONE && state.withoutCheck && state.twoCheck && state.threeCheck && !state.allCheck)
    return {
      ...state,
      allCheck: true,
      oneCheck: true,
    }

  if (action.type === CHECK_ONE)
    return {
      ...state,
      oneCheck: true,
    }

  if (action.type === NO_CHECK_ONE && state.allCheck)
    return {
      ...state,
      allCheck: false,
      oneCheck: false,
    }

  if (action.type === NO_CHECK_ONE)
    return {
      ...state,
      oneCheck: false,
    }

  if (action.type === CHECK_TWO && state.withoutCheck && state.oneCheck && state.threeCheck && !state.allCheck)
    return {
      ...state,
      allCheck: true,
      twoCheck: true,
    }

  if (action.type === CHECK_TWO)
    return {
      ...state,
      twoCheck: true,
    }

  if (action.type === NO_CHECK_TWO && state.allCheck)
    return {
      ...state,
      allCheck: false,
      twoCheck: false,
    }

  if (action.type === NO_CHECK_TWO)
    return {
      ...state,
      twoCheck: false,
    }

  if (action.type === CHECK_THREE && state.withoutCheck && state.twoCheck && state.oneCheck && !state.allCheck)
    return {
      ...state,
      allCheck: true,
      threeCheck: true,
    }

  if (action.type === CHECK_THREE)
    return {
      ...state,
      threeCheck: true,
    }

  if (action.type === NO_CHECK_THREE && state.allCheck)
    return {
      ...state,
      allCheck: false,
      threeCheck: false,
    }

  if (action.type === NO_CHECK_THREE)
    return {
      ...state,
      threeCheck: false,
    }

  return state
}

export const checkAllAction = (e) => {
  if (e.target.checked) return { type: CHECK_ALL }
  if (!e.target.checked) return { type: NO_CHECK_ALL }
}

export const checkWithoutAction = (e) => {
  if (e.target.checked) return { type: CHECK_WITHOUT }
  if (!e.target.checked) return { type: NO_CHECK_WITHOUT }
}

export const checkOneAction = (e) => {
  if (e.target.checked) return { type: CHECK_ONE }
  if (!e.target.checked) return { type: NO_CHECK_ONE }
}

export const checkTwoAction = (e) => {
  if (e.target.checked) return { type: CHECK_TWO }
  if (!e.target.checked) return { type: NO_CHECK_TWO }
}

export const checkThreeAction = (e) => {
  if (e.target.checked) return { type: CHECK_THREE }
  if (!e.target.checked) return { type: NO_CHECK_THREE }
}
