'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react';

// Define types for the three request objects
export type MyRequestDataType = {
  id: number;
  requestType: string;
  requestDate: string;
  postingOfficer: string;
  approvingOfficer: string;
};

export type PendingRequestDataType = {
  id: number;
  tablename: string;
  authdesc: string;
  authid: string;
  posttype: string;
  createdate: string;
  authstatus: string;
  searchfield: string;
  authdate: string;
  latestupdate: string;
  post_user: string;
  narration: string;
};

export type RejectedRequestDataType = {
  id: number;
  requestType: string;
  rejectDate: string;
  postingOfficer: string;
  approvingOfficer: string;
  rejectReason: string;
};

// Initial values for each request data type
const initialRequestModuleContext = {
  myRequestData: {
    id: 0,
    requestType: '',
    requestDate: '',
    postingOfficer: '',
    approvingOfficer: ''
  },

  pendingRequestData: {
    id: 0,
    tablename: '',
    authdesc: '',
    authid: '',
    posttype: '',
    createdate: '',
    authstatus: '',
    searchfield: '',
    authdate: '',
    latestupdate: '',
    post_user: '',
    narration: ''
  },

  rejectedRequestData: {
    id: 0,
    requestType: '',
    rejectDate: '',
    postingOfficer: '',
    approvingOfficer: '',
    rejectReason: ''
  },

  setMyRequestData: (() => {}) as Dispatch<SetStateAction<MyRequestDataType>>,
  setPendingRequestData: (() => {}) as Dispatch<
    SetStateAction<PendingRequestDataType>
  >,
  setRejectedRequestData: (() => {}) as Dispatch<
    SetStateAction<RejectedRequestDataType>
  >
};

type RequestModuleContextType = typeof initialRequestModuleContext;

export const RequestModuleContext = createContext<RequestModuleContextType>(
  initialRequestModuleContext
);

export default function RequestModuleContextProvider({ children }: any) {
  const [myRequestData, setMyRequestData] = useState<MyRequestDataType>({
    id: 0,
    requestType: '',
    requestDate: '',
    postingOfficer: '',
    approvingOfficer: ''
  });

  const [pendingRequestData, setPendingRequestData] =
    useState<PendingRequestDataType>({
      id: 0,
      tablename: '',
      authdesc: '',
      authid: '',
      posttype: '',
      createdate: '',
      authstatus: '',
      searchfield: '',
      authdate: '',
      latestupdate: '',
      post_user: '',
      narration: ''
    });

  const [rejectedRequestData, setRejectedRequestData] =
    useState<RejectedRequestDataType>({
      id: 0,
      requestType: '',
      rejectDate: '',
      postingOfficer: '',
      approvingOfficer: '',
      rejectReason: ''
    });

  const value: RequestModuleContextType = useMemo(() => {
    return {
      myRequestData,
      setMyRequestData,
      pendingRequestData,
      setPendingRequestData,
      rejectedRequestData,
      setRejectedRequestData
    };
  }, [myRequestData, pendingRequestData, rejectedRequestData]);

  return (
    <RequestModuleContext.Provider value={value}>
      {children}
    </RequestModuleContext.Provider>
  );
}
