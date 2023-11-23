import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormContainer } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/api';
import { getContacts } from 'redux/selectors';


const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Reguired'),
    phone: Yup.number().min(2, 'Too Short!').required('Required'),
});


export const ContactForm = () => {
  const dispatch = useDispatch();
  
  const contactNameTest = useSelector(getContacts);

  const handleSubmit = (newContact, contactNameTest) => {
    const normalizedName = newContact.name.toLowerCase();
    let duplicatedName = contactNameTest.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
  
     
    if (duplicatedName) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name: newContact.name, phone:newContact.phone }));
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{
          name: '',
          phone: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, contactNameTest );
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
            <label htmlFor="phone">Phone</label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              placeholder="459-12-56XXX"
            />
            <ErrorMessage name="phone" />
          </div>

          <button type="submit" className="btn btn-submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </FormContainer>
  );
};