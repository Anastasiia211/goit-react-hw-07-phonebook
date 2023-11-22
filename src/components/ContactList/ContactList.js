import { List, ListItem } from './ContactList.styled';
import { deleteContact } from 'redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
    const visibleContacts = useSelector(selectVisibleContacts);
    const dispatch = useDispatch();
  const handleDelete = evt => dispatch(deleteContact(evt.target.id));

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
                        onClick={handleDelete}>
                        Delete
                    </button>
                </ListItem>
            ))}
        </List>
    );
};