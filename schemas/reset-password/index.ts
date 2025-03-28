import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object({
  password: Yup.string().required('Required').min(4, 'password is too short'),
  confirmPassword: Yup.string().required('Required')
});
