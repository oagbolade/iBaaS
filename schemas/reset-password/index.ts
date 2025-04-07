import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required('Required')
    .min(8, 'password is too short'),
  confirmPassword: Yup.string().required('Required')
});
