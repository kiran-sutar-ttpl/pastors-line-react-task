import { UPDATE_SEARCH_KEY, UPDATE_ONLY_EVEN_KEY_FILTER, UPDATE_PAGE_NUMBER, UPDATE_COUNTRY, INCREMENT_PAGE_NUMBER } from '../utils/constants'

export const updateSearchKey = (key) => ({ type: UPDATE_SEARCH_KEY, payload: key })
export const updateEvenFilter = (isOnlyEven) => ({ type: UPDATE_ONLY_EVEN_KEY_FILTER, payload: isOnlyEven })
export const updatePageNumber = (pageNumber) => ({ type: UPDATE_PAGE_NUMBER, payload: pageNumber })
export const incrementPageNumber = () => ({ type: INCREMENT_PAGE_NUMBER })
export const updateCountry = (countryId) => ({ type: UPDATE_COUNTRY, payload: countryId })
