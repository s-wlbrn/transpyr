import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('A name is required.')
    .max(42, 'Name must be under 42 characters.'),
  email: yup
    .string()
    .required('An email is required.')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email.'
    ),
});
