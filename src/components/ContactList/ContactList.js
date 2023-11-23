import { List, ListItem } from './ContactList.styled';
import { deleteContact } from 'redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
    const selectContacts = useSelector(selectVisibleContacts);
   
    const dispatch = useDispatch();
    const handleDelete = evt => dispatch(deleteContact(evt.target.id));

    return (
        <List>
            {selectContacts.map(contact => (
                <ListItem key={contact.id}>
                    <p>
                        <span>{contact.name}: </span>
                        <span>{contact.phone}</span>
                    </p>

                    <button
                        type="button"
                        id={contact.id}
                        className='btn btn-submit'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </ListItem>
            ))}
        </List>
    );
};