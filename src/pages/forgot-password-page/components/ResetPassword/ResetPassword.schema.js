import * as yup from 'yup';

export const validationSchema = yup.object().shape({
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
