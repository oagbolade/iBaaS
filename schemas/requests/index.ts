import * as Yup from 'yup';

export const rejectPendingRequestSchema = Yup.object({
  comments: Yup.string().required('Required')
});
