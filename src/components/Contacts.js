import React, { useEffect, useCallback, useRef } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import ContactsModal from './ContactsModal'
import CustomScrollbar from './CustomScrollbar'
import { updateCountry, incrementPageNumber } from '../actions/filterActions'
import { fetchContacts } from '../actions/contactsAction'

const getContacts = (state) => state.contacts.data
const evenFilter = (state) => state.filter.isOnlyEven
const filterEvenContacts = createSelector(
  [getContacts, evenFilter],
  (contacts, onlyEven) => {
    if(onlyEven) return contacts.filter(contact => contact.id % 2 === 0)
    return contacts
  }
)

const mapStateToProps = (state) => ({
  contactsState: state.contacts,
  contactsData: filterEvenContacts(state),
  pageNumber: state.filter.pageNumber,
  searchKey: state.filter.searchKey,
  loading: state.contacts.loading,
  hasErrors: state.contacts.hasErrors
})

const mapDispatchToProps = (dispatch) => ({
  setCountry: (countryId) => dispatch(updateCountry(countryId)),
  nextPage: () => dispatch(incrementPageNumber()),
  fetchData: (countryId, searchKey, pageNumber) => dispatch(fetchContacts(countryId, searchKey, pageNumber))
})

const Contacts = ({countryId, title, 
  pageNumber, searchKey, contactsData,
  loading, hasErrors,
  selectActiveContact, 
  fetchData, setCountry, nextPage}) => {
  
  const setCountryCallback = useCallback(() => setCountry(countryId), [countryId, setCountry])
  useEffect(() => {
    setCountryCallback()
  }, [setCountryCallback])
  
  useEffect(() => {
    fetchData(countryId, searchKey, pageNumber)
  }, [countryId, searchKey, pageNumber, fetchData])

  const onReachedToBottom = useCallback(() => {
    nextPage()
  }, [nextPage])

  const contactsRef = useRef()
  const singleContactRef = useRef()
  const contactsModalRef = useRef()

  useEffect(() => 
    contactsRef.current.click()
  ,[])

  return (
    <ContactsModal title={title} isLoading={loading}>
      <button
        ref={contactsRef}
        type="button"
        data-target="#contactModal"
        data-toggle="modal"
        className="btn mr-2"
        style={{ background: "#46139f", color: "#fff", display: "none" }}
      />
      <button
        ref={singleContactRef}
        type="button"
        data-target="#singleContactModal"
        data-toggle="modal"
        className="btn mr-2"
        style={{ background: "#46139f", color: "#fff", display: "none" }}
      />
      <button
        className="btn bg-white ml-2"
        style={{ color: "#46139f", borderColor: "#46139f", display: "none" }}
        data-dismiss="modal"
        ref={contactsModalRef}
      />
      {!hasErrors && (
        <CustomScrollbar
          onReachedBottom={onReachedToBottom}
          style={{ height: 400 }}
        >
          {contactsData.map((contact, id) => (
            <div
              key={id}
              className="d-flex"
              style={{ cursor: "pointer" }}
              onClick={() => {
                selectActiveContact(contact);
                singleContactRef.current.click();
              }}
            >
              <p className="mr-3">{contact.id}</p>
              <p className="mr-3">
                <b>
                  {contact.first_name} {contact.last_name}
                </b>
              </p>
              <p className="mr-3">{contact.phone_number}</p>
              <p>{contact.email}</p>
            </div>
          ))}
        </CustomScrollbar>
      )}
      {hasErrors && "Error"}
    </ContactsModal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
