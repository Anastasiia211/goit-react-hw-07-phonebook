import { Formik, Field, Form } from 'formik';
import { FilterContainer } from './Filter.styled';
import { changeFilter } from 'redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter.filter);
  const handleChange = e => dispatch(changeFilter(e.target.value));

    return (
    <FilterContainer>
      <p>Find contacts by name</p>
      <Formik
        initialValues={{
          search: '',
        }}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        <Form>
          <div className="container">
            <label htmlFor="search">Name</label>
            <Field
              id="search"
              name="search"
              placeholder="John Doe"
              value={filterValue}
              onChange={handleChange}
            />
          </div>
        </Form>
      </Formik>
    </FilterContainer>
  );
};
