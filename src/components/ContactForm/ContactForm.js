import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormContainer } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice';
import { getContacts } from 'redux/selectors';


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Reguired'),
    number: Yup.number().min(2, 'Too Short!').required('Required'),
});


export const ContactForm = () => {
  const dispatch = useDispatch();
  const contactName = useSelector(getContacts);

  const handleSubmite = (newContact, contactName) => {
    const normalizeName = newContact.name.toLowerCase();
    let duplicatedName = contactName.some(
      contact => contact.name.toLowerCase() === normalizeName
    );
  
     
    if (duplicatedName) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact({name: newContact.name, phone:newContact.phone }));
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          handleSubmite(values, contactName);
          actions.resetForm();
        }}
      >
        <Form>
          <div className="container">
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" placeholder="Jane" />
            <ErrorMessage name="name" />
          </div>
          <div className="container">
            <label htmlFor="number">Number</label>
            <Field
              type="tel"
              id="number"
              name="number"
              placeholder="XXX-XX-XXXXX"
            />
            <ErrorMessage name="number" />
          </div>

          <button type="submit" className="btn btn-submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </FormContainer>
  );
};