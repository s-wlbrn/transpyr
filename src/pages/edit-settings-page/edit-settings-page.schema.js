import * as yup from 'yup';

export const passwordValidationSchema = yup.object().shape({
  password: yup.string().required('Current password is required.'),
  newPassword: yup
    .string()
    .required('New password is required.')
    .min(8, 'Password must be at least 8 characters long.'),
  newPasswordConfirm: yup
    .string()
    .required('New password confirmation is required.')
    .test('passwords-match', 'Passwords must match.', function (value) {
      return this.parent.newPassword === value;
    }),
});

export const nameValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('A name is required.')
    .max(42, 'Name must be under 42 characters.'),
});
