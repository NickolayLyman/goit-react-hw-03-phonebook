import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Component } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import st from './ContactForm.module.css';

uuidv4();

const validationSchema = yup.object({
  name: yup.string().required("Enter contact's name"),
  number: yup
    .string()
    .length(10, 'Example: 0969175934')
    .required('Enter phone number'),
});

class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { name: '', number: '' };

  render() {
    return (
      <>
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={validationSchema}
          onSubmit={({ name, number }, { resetForm, setSubmitting }) => {
            this.props.onSubmit({ name, number, id: uuidv4() });
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form className={st.form} autoComplete="off">
            <label className={st.label}>
              Name:
              <span className={st.error}>
                <ErrorMessage name="name" />
              </span>
              <Field type="text" name="name" className={st.input} />
            </label>
            <label className={st.label}>
              Number:
              <span className={st.error}>
                <ErrorMessage name="number" />
              </span>
              <Field type="tel" name="number" className={st.input} />
            </label>
            <button type="submit" className={st.btn}>
              Add contact
            </button>
          </Form>
        </Formik>
      </>
    );
  }
}

export default ContactForm;
