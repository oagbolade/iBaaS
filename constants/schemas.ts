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

export const bank = Yup.object({
    bankName:Yup.string().required('Required'),
    bankCode: Yup.string().required('Required'),
    bankMnemonic: Yup.string().required('Required'),
})
export const branch = Yup.object({
    branchCode: Yup.string().required('Required'),
    branchName: Yup.string().required('Required'),
    branchType: Yup.string().required('Required'),
    mainBranch: Yup.string().required('Required'),
    branchAddress: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    town: Yup.string().required('Required'),
    emailAddress: Yup.string().required('Required'),
    fax: Yup.string().required('Required'),
    telePhoneNumber: Yup.string().required('Required'),
})

export const role = Yup.object({
    roleName: Yup.string().required('Required'),
    roleDescription: Yup.string().required('Required'),
    ideleTimeOut: Yup.string().required('Required'),
});