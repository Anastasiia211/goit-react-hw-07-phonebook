import { List, ListItem } from './ContactList.styled';
import { deleteContact } from 'redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';


export const ContactList = () => {
    const dispatch = useDispatch();
    const filterValue = useSelector(state => state.filter.filter);
    const contactsValue = useSelector(state => state.contacts.contacts);

    const visibleContacts = contactsValue.filter(contact => {
        const normalizedFilter = filterValue.toLowerCase();
        return contact.name.toLowerCase().includes(normalizedFilter);
    });

    const onDelete = evt => {
        const contactsFiltered = contactsValue.filter(
            contact => contact.name !== evt.target.id
        );
        dispatch
            (deleteContact(contactsFiltered));
    };
    return (
        <List>
            {visibleContacts.map(contact => (
                <ListItem key={contact.id}>
                    <p>
                        <span>{contact.name}: </span>
                        <span>{contact.number}</span>
                    </p>
                    <button
                        type="button"
                        id={contact.name}
                        className='btn btn-submit'
                        onClick={onDelete}>
                        Delete
                    </button>
                </ListItem>
            ))}
        </List>
    );
};