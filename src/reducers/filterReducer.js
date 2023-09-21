import { UPDATE_SEARCH_KEY, UPDATE_ONLY_EVEN_KEY_FILTER, UPDATE_PAGE_NUMBER, UPDATE_COUNTRY, INCREMENT_PAGE_NUMBER } from '../utils/constants'

export const initialState = {
  searchKey: '',
  isOnlyEven: false,
  countryId: 0,
  pageNumber: 1
}

export default function filterReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_SEARCH_KEY:
      return {
        ...state,
        searchKey: action.payload,
        pageNumber: 1
      }

    case UPDATE_ONLY_EVEN_KEY_FILTER:
      return {
        ...state,
        isOnlyEven: action.payload
      }

    case UPDATE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload
      }
      
    case INCREMENT_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: state.pageNumber + 1
      }

    case UPDATE_COUNTRY:
      return {
        ...state,
        countryId: action.payload,
        pageNumber: 1
      }

    default:
      return state
  }
}
