import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector } from 'react-redux';


export const App = () => {
  const filterValue = useSelector(state => state.filter.filter);
  const contactsValue = useSelector(state => state.contacts.contacts);

  const visibleContacts = contactsValue.filter(contact => {
    const normalizedFilter = filterValue.toLowerCase();
    return contact.name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <div className='numberCard'>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {visibleContacts.length > 0 && <ContactList />}
    </div>
  );
};