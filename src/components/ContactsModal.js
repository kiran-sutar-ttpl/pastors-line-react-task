import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateSearchKey , updateEvenFilter } from '../actions/filterActions'

const mapStateToProps = (state) => ({
  searchKey: state.filter.searchKey,
  isOnlyEven: state.filter.isOnlyEven
})

const mapDispatchToProps = (dispatch) => ({
  updateSearch: (s) => dispatch(updateSearchKey(s)),
  updateOnlyEvenFilter: (b) => dispatch(updateEvenFilter(b))
})

const ContactsModal = ({ title, searchKey, isOnlyEven, isLoading=false, updateSearch, updateOnlyEvenFilter, children }) => {
  var timerId = null
  const onHandleKeydown = (e) => {
    if(e.keyCode === 13) {
      if(e.target.value !== '') {
        if(timerId != null) clearTimeout(timerId)    
        updateSearch(e.target.value)
      }
      e.preventDefault()
    }
  }

  const onHandleChange = (e) => {
    if(timerId != null) { 
      clearTimeout(timerId)
    }
    const inputValue = e.target.value
    timerId = setTimeout(() => {
      updateSearch(inputValue)
    }, 150)
  }
  return (
    <div
      style={{ marginLeft: "30vw"}}
      className="modal"
      id="contactModal"
      tabIndex="-1"
      aria-labelledby="contactModal"
      role="dialog"
    >
      <div className="modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">{title}</h5>
            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search contacts"
                  value={searchKey}
                  onKeyDown={onHandleKeydown}
                  onChange={onHandleChange}
                />
              </div>
            </form>
          </div>

          <div className="modal-body">{children}</div>
          <div className="modal-footer d-flex justify-content-between">
            <div className="mt-3">
              <input
                className="mr-2"
                id="onlyEven"
                type="checkbox"
                label="Only even"
                checked={isOnlyEven}
                onChange={(e) => updateOnlyEvenFilter(e.target.checked)}
              />
              <label form="onlyEven">Only even</label>
            </div>
            {isLoading && (
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}

            <div>
              <Link to="/all-contacts">
                <button
                  type="button"
                  className="btn mx-2"
                  style={{ backgroundColor: "#46139f", color: "#fff" }}
                >
                  All Contacts
                </button>
              </Link>
              <Link to="/usa-contacts">
                <button
                  className="btn mx-2"
                  style={{ backgroundColor: "#ff7f50", color: "#fff" }}
                >
                  US Contacts
                </button>
              </Link>
              <Link to="/">
                <button
                  className="btn bg-white ml-2"
                  style={{ color: "#46139f", borderColor: "#46139f" }}
                  data-dismiss="modal"
                >
                  Close
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsModal)