interface IProfiles {
  userid: string;
  sys_date: string;
  roleid: number;
  rolelevel: string;
  dmb: 0;
}

export interface UserLoginResponse {
  responseCode: string;
  responseDescription?: string;
  profiles: IProfiles;
  menuItems: string;
  token: string;
  initialData?: string | null;
  companyCode?: string;
}

export interface CreateAccountResponse {
  responseCode: string;
  responseDescription?: string;
  profiles: IProfiles;
  menuItems: string;
  token: string;
  initialData?: string | null;
}

export interface CreateAccountOfficerRequest {
  responseCode: string;
  responseDescription?: string;
  profiles: IProfiles;
  menuItems: string;
  token: string;
  initialData?: string | null;
}
