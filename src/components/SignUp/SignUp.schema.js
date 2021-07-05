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
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.'),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required.')
    .test('passwords-match', 'Passwords must match.', function (value) {
      return this.parent.password === value;
    }),
});
