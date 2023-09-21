import { GET_ALL_CONTACTS, GET_ALL_CONTACTS_SUCCESS, RESET_ALL_CONTACTS } from '../utils/constants'

export const initialState = {
  data: [],
  loading: false,
  hasErrors: false,
}

export default function contactsReducer(state = initialState, action) {
  switch(action.type) {
    case GET_ALL_CONTACTS:
      return {...state, loading: true, hasErrors: false}
    case GET_ALL_CONTACTS_SUCCESS:
      return {data: [...state.data, ...action.payload], loading: false, hasErrors: false}
    case RESET_ALL_CONTACTS:
      return initialState
    default:
      return state
  }
}
