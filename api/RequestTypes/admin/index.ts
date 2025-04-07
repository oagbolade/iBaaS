import { IProfiles } from '../CommonTypes';

export interface CreateAccountOfficerRequest {
  responseCode: string;
  responseDescription?: string;
  profiles: IProfiles;
  menuItems: string;
  token: string;
  initialData?: string | null;
}

export interface ValidatePasswordRequest {
  oldpassword: string;
  userid: string;
  tenantid: string;
}

export interface ResetPasswordPayload {
  Oldpassword: string;
  Newpassword: string;
  sscode: string;
  passchange_date: string;
  userid: string;
}
