import { IFetchingState } from '@/constants/types';

export interface IProfiles {
  userid: string;
  sys_date: string;
  roleid: number;
  rolelevel: number;
  dmb: 0;
}

export interface APIResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  responseMessage?: string;
  isSearch?: boolean;
  data?: Array<any>;
  message?: string;
  ResponseDescription?: string;
}

export interface IMembers {
  memberCode: number;
  groupCode: string;
}

export interface RemoveGroupMembersRequest {
  members: IMembers[] | Array<any>;
}
