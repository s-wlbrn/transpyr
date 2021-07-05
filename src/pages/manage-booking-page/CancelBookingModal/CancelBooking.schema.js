import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  cancelationReason: yup
    .string()
    .max(150, 'Cancelation reason must be under 150 characters.'),
});
