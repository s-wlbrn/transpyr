import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  feePolicy: yup
    .string()
    .required('A fee policy is required.')
    .oneOf(['absorbFee', 'passFee'], 'Invalid fee policy.'),
  refundPolicy: yup.string(),
});
