import React from 'react'

const Contact = ({ contact }) => {
  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      id="singleContactModal"
      style={{ marginLeft: "30vw", zIndex: 9000 }}
    >
      <div className="modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contact Detail</h5>
          </div>
          <div className="modal-body">
            <div>
              <p>
                <p>
                  <b>id:</b> {contact.id}
                </p>
                <b>Full name:</b> {contact.first_name} {contact.last_name}
              </p>
              <p>
                <b>Phone number:</b> {contact.phone_number}
              </p>
              <p>
                <b>email:</b> {contact.email}
              </p>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              className="btn bg-white ml-auto"
              style={{ color: "#46139f", borderColor: "#46139f" }}
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact
  