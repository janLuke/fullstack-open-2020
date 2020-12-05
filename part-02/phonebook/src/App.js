import React, { useState } from 'react'
import './App.css'
import ContactForm from './ContactForm';
import ContactListWithFilter from './ContactListWithFilter';


const Card = ({ className, children }) => {
   let classes = 'Card' + (' ' + className || '');
   return (
      <div className={classes}>
         {children}
      </div>
   )
}


const App = () => {
   const [contacts, setContacts] = useState([
      { name: 'Arto Hellas', phoneNumber: '040-123456' },
      { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
      { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
      { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' },
   ])

   const addNewContact = (contact) => {
      let newContacts = [...contacts, contact]
      newContacts.sort((a, b) => a.name.localeCompare(b.name))
      setContacts(newContacts)
   }

   return (
      <div className="App">
         <h1 className="header">PhoneBook</h1>
         <div className="content">
            <Card className="add-item-card">
               <ContactForm contacts={contacts} onSubmit={addNewContact} />
            </Card>
            <Card className="contact-list-card">
               <ContactListWithFilter contacts={contacts} />
            </Card>
         </div>
      </div >
   )
}

export default App