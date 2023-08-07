import * as Yup from 'yup';

export const user = Yup.object({
    staffId: Yup.string().required('Required'),
    staffName: Yup.string().required('Required'),
    branch: Yup.string().required('Required'),
});

export const password = Yup.object({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required'),
    accessKey: Yup.string().required('Required'),
})


export const role = Yup.object({
    roleName: Yup.string().required('Required'),
    roleDescription: Yup.string().required('Required'),
    ideleTimeOut: Yup.string().required('Required'),
});