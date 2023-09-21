import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Contacts from './components/Contacts'
import Contact from './components/Contact'
import { ALL_COUNTRIES, COUNTRY_USA } from './utils/constants'

const App = () => {
  const [showContacts, setShowContacts] = useState(true)
  const [activeContact, setActiveContact] = useState(null)
  
  const onSelectedActiveContact = (contact) => {
    setShowContacts(false)
    setActiveContact(contact)
  }

  return (
    <Router>
      <div className="text-center">
        <Link to="/all-contacts">
          <button
            type="button"
            data-target="#contactModal"
            data-toggle="modal"
            className="btn mr-2"
            style={{ background: "#46139f", color: "#fff" }}
            
          >
            All Contacts
          </button>

        </Link>
        <Link to="/usa-contacts">
          <button
            className="btn"
            type="button"
            data-target="#contactModal"
            data-toggle="modal"
            style={{ background: "#ff7f50", color: "#fff" }}
          >
            US Contacts
          </button>
        </Link>

        {activeContact !== null && (
          <Contact
            contact={activeContact}
          />
        )}

        <Switch>
          <Route exact path="/all-contacts">
            <Contacts
              title="All Contacts"
              countryId={ALL_COUNTRIES}
              showContacts={showContacts}
              selectActiveContact={onSelectedActiveContact}
            />
          </Route>
          <Route exact path="/usa-contacts">
            <Contacts
              title="US Contacts"
              countryId={COUNTRY_USA}
              showContacts={showContacts}
              selectActiveContact={onSelectedActiveContact}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
