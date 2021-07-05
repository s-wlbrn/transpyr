import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  tagline: yup
    .string()
    .max(150, 'Tagline must be shorter than 150 characters.'),
  interests: yup
    .string()
    .max(500, 'Interests must be shorter than 500 characters.'),
  bio: yup.string().max(1000, 'Bio must be shorter than 1000 characters.'),
});
