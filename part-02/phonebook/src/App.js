import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as api from './api'

import ContactForm from './ContactForm'
import ContactListWithFilter from './ContactListWithFilter'
import { replaceElem } from './util';


/**
 * WARNING: mutate the Array in-place!
 */
function sortByName(contacts) {
   return contacts.sort((a, b) => a.name.localeCompare(b.name))
}

export default function App() {
   const [state, setState] = useState("loading")
   const [contacts, setContacts] = useState([])
   const [error, setError] = useState(null)

   useEffect(() => {
      api.getAllContacts()
         .then(contactList => {
            setContacts(sortByName(contactList))
            setState("ready")
         })
         .catch(error => {
            setState("error")
            setError(error.message)
         })
   }, [])

   const addNewContact = async (newContactData) => {
      api.addContact(newContactData)
         .then(newContact => {
            let updatedContactList = [...contacts, newContact]
            setContacts(sortByName(updatedContactList))
         })
         .catch(err => {
            console.log(err)
            toast.error(
               'Ops! There was a problem sending the new contact to the ' +
               'server! The contact could not be saved, sorry :(')
         })
   }

   const updateContact = (modifiedContact) => {
      api.updateContact(modifiedContact)
         .then(updated => {
            console.log(updated);
            let index = contacts.findIndex(c => c.id === modifiedContact.id)
            let newContacts = replaceElem(contacts, index, updated)
            console.log(newContacts)
            setContacts(sortByName(newContacts))
         })
         .catch(err => {
            console.error(err)
            toast.error(
               "Ops! There was a problem while trying to update the contact. " +
               "Details: " + err.message)
         })
   }

   const deleteContact = (id) => {
      api.deleteContact(id)
         .then(resp => {
            setContacts(contacts.filter(c => c.id !== id))  // preserve sorting
         })
         .catch(err => {
            console.error(err)
            toast.error(
               "Ops! There was a problem while trying to delete the contact " +
               "from your cloud phonebook! Details: " + err.message)
         })
   }

   let content = null;
   if (state === 'ready') {
      content = (
         <>
            <Card className="add-item-card">
               <ContactForm
                  contacts={contacts}
                  onAddNew={addNewContact}
                  onUpdate={updateContact}
               />
            </Card>
            <Card className="contact-list-card">
               <ContactListWithFilter
                  contacts={contacts}
                  onDelete={deleteContact}
               />
            </Card>
         </>
      )
   }
   else if (state === 'loading') {
      content = null   // FIXME: put a spinner here
   }
   else if (state === 'error') {
      content = <p style={{ color: 'red' }}>{error}</p>
   }
   else
      throw new Error('invalid state');

   return (
      <div className="App">
         <ToastContainer />
         <h1 className="header">PhoneBook</h1>
         <div className="content">
            {content}
         </div>
      </div >
   )
}

const Card = ({ className, children }) => {
   let classes = 'Card' + (' ' + className || '')
   return (
      <div className={classes}>
         {children}
      </div>
   )
}