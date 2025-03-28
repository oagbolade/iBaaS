export interface approvePendingRequestFormValues {
  id: number;
  comment: string;
}

export interface RejectPendingRequestFormValues {
  comments: string;
}

export const rejectPendingRequestInitialValues: RejectPendingRequestFormValues =
  {
    comments: ''
  };

export interface rejectPendingRequestFormValues
  extends RejectPendingRequestFormValues {
  id: string;
}
