import React, { useState } from 'react'

const PHONE_FIELD_INSTRUCTIONs =
   'A phone number can only contain digits separated by a single space ' +
   'or "-". Optionally, it can start with "+".'

const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

const normalizeName = (name) => name.trim().toLowerCase()

const prettifyName = (name) => (
   name.trim()
      .split(/\s+/)
      .map(capitalize)
      .join(' ')
)

const prevalidateName = (name, contacts) => {
   name = normalizeName(name);
   if (!name)
      return ''
   if (contacts.some(contact =>
      normalizeName(contact.name) === name))
      return 'This name is already in the contact list!'
   return '';
}

const prevalidatePhone = (phone) => {
   phone = phone.trim();
   if (!phone)
      return ''
   if (!phone.match(/^[+]?([0-9]+[- ]?)*$/))
      return PHONE_FIELD_INSTRUCTIONs;
   return '';
}

const validateName = (name, contacts) => {
   name = normalizeName(name)
   if (!name)
      return 'Empty name!'
   prevalidateName(name, contacts)
   return '';
}

const validatePhone = (phone) => {
   phone = phone.trim();
   if (!phone)
      return 'Empty phone number!'
   if (!phone.match(/^[+]?[0-9]+([ -][0-9]+)*$/))
      return PHONE_FIELD_INSTRUCTIONs
   return '';
}

const InputFormField = ({ type, label, id, value, onChange, error, inputRef, ...props }) => (
   <div className="FormField">
      <label htmlFor={id} className="FormField__label">{label}:</label>
      <input
         ref={inputRef}
         className={(error) ? "in-error" : undefined}
         id={id}
         type={type}
         value={value}
         onChange={onChange}
         {...props}
      />
      {error && <div className="FormField__error">{error}</div>}
   </div>
)

export default function ContactForm({ contacts, onSubmit }) {
   const [name, setName] = useState('')
   const [nameError, setNameError] = useState('')
   const [phone, setPhone] = useState('')
   const [phoneError, setPhoneError] = useState('')
   const [nameInput, setNameInput] = useState(null)

   const updateName = (event) => {
      let newName = event.target.value
      let error = prevalidateName(newName, contacts)
      setNameError(error)
      setName(newName)
   }

   const updatePhone = (event) => {
      let newNumber = event.target.value
      let error = prevalidatePhone(newNumber.trim())
      setPhoneError(error)
      setPhone(newNumber)
   }

   const submit = (event) => {
      event.preventDefault()
      let nameErr = validateName(name, contacts)
      let phoneErr = validatePhone(phone.trim(), contacts)
      if (nameErr || phoneErr) {
         setNameError(nameErr)
         setPhoneError(phoneErr)
      }
      else {
         nameInput.focus();
         setName('')
         setPhone('')
         onSubmit({
            name: prettifyName(name),
            phoneNumber: phone.trim()
         })
      }
   }

   const disabled = !name || !phone || nameError || phoneError;

   return (
      <form className="ContactForm">
         <InputFormField
            inputRef={setNameInput}
            label="Name"
            id="name-field"
            value={name}
            error={nameError}
            onChange={updateName}
         />
         <InputFormField
            label="Phone number"
            id="phone-field"
            value={phone}
            error={phoneError}
            onChange={updatePhone}
         />
         <button type="submit" onClick={submit} disabled={disabled}>
            Add new contact
         </button>
      </form>
   )
}
