import { IProfiles } from '@/api/RequestTypes/CommonTypes';

export interface MenuItemsType {
  menuLevel: number;
  menu_id: number;
  menu_name: string;
  otpFlag: number;
  parent: string;
  trancode: string;
  url: string;
}

export interface UserLoginResponse {
  responseCode: string;
  responseDescription?: string;
  profiles: IProfiles;
  menuItems: MenuItemsType[];
  token: string;
  tokenExpire: string;
  initialData?: string | null;
  companyCode?: string;
  fullName?: string;
}
