import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ContactForm from './ContactForm'
import ContactListWithFilter from './ContactListWithFilter'


export default function App() {
   const [state, setState] = useState({ type: "loading" })
   const [contacts, setContacts] = useState([])

   useEffect(() => {
      axios.get('http://localhost:3001/contacts')
         .then(resp => {
            console.log(resp);
            setContacts(resp.data)
            setState({ type: "ready" })
         })
         .catch(error => setState({
            type: "error",
            error: error.message,
         }))
   }, [])

   const addNewContact = (contact) => {
      let newContacts = [...contacts, contact]
      newContacts.sort((a, b) => a.name.localeCompare(b.name))
      setContacts(newContacts)
   }

   let content = null;
   if (state.type === 'ready') {
      content = (
         <>
            <Card className="add-item-card">
               <ContactForm contacts={contacts} onSubmit={addNewContact} />
            </Card>
            <Card className="contact-list-card">
               <ContactListWithFilter contacts={contacts} />
            </Card>
         </>
      )
   }
   else if (state.type === 'loading') {
      content = null   // FIXME: put a spinner here
   }
   else if (state.type === 'error') {
      content = <p style={{ color: 'red' }}>{state.error}</p>
   }
   else
      throw new Error('invalid state.type');

   return (
      <div className="App">
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