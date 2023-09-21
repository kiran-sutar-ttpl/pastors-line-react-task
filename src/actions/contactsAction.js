import axios from 'axios'
import {
  GET_ALL_CONTACTS, 
  GET_ALL_CONTACTS_SUCCESS, 
  RESET_ALL_CONTACTS, 
  AUTH_TOKEN,
  DEFAULT_COMPANY_ID, 
  DEFAULT_NO_GROUP_DUPLICATES } from '../utils/constants'
import allContacts from '../utils/data.json'

export const getAllContacts = () => ({ type: GET_ALL_CONTACTS })
export const getAllContactsSuccess = (contacts) => ({ type: GET_ALL_CONTACTS_SUCCESS, payload: contacts })
export const resetAllContacts = () => ({ type: RESET_ALL_CONTACTS })


export const fetchContacts = (countryId, queryStr, pageNumber) => {
  return async dispatch => {
    if(pageNumber === 1) { 
      dispatch(resetAllContacts()) 
    }
    dispatch(getAllContacts())

    const params = {
      page: pageNumber,
      companyId: DEFAULT_COMPANY_ID,
      noGroupDuplicates: DEFAULT_NO_GROUP_DUPLICATES
    }
    if(countryId !== 0) {
      params['countryId'] = countryId
    }
    if(queryStr.length > 0) {
      params['query'] = queryStr 
    }
    const config = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      params
    }
    const contacts = []
    let contactResponse
    try {
      const { data } = await axios.get('https://api.dev.pastorsline.com/api/contacts.json', config)

      if (data.contacts?.length) {
      contactResponse = data.contacts
    } else {
      throw new Error('No contacts found')
    }
    } catch(error) {
      // using dummy contacts as we didn't get contacts from api response or api response failed
      contactResponse = allContacts.contacts
    } finally {
      for (let id in contactResponse) {
        contacts.push(contactResponse[id])
      }
      dispatch(getAllContactsSuccess(contacts))
    }
  }
}
