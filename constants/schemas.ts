import * as Yup from 'yup';

export const user = Yup.object({
    email: Yup.string().required('Required'),
    staffId: Yup.string().required('Required'),
    staffName: Yup.string().required('Required'),
    branch: Yup.string().required('Required'),
});