import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  tierName: yup
    .string()
    .required('A ticket name is required.')
    .max(50, 'Ticket name cannot exceed 50 characters.'),
  tierDescription: yup
    .string()
    .required('A ticket description is required.')
    .max(150, 'Ticket description cannot exceed 150 characters.'),
  online: yup.boolean().required(),
  capacity: yup
    .number()
    .typeError('Invalid capacity.')
    .required()
    .min(0, 'Ticket capacity must be a positive number.'),
  price: yup
    .number()
    .typeError('Invalid price.')
    .required()
    .min(0, 'Ticket price must be a positive number.'),
  limitPerCustomer: yup
    .number()
    .typeError('Invalid per-customer limit.')
    .required()
    .min(1, 'Per-customer limit must be 1 or greater.')
    .when('capacity', (capacity, schema) => {
      return capacity > 0
        ? schema.max(
            capacity,
            'Limit per customer cannot exceed the ticket capacity.'
          )
        : schema;
    }),
});
