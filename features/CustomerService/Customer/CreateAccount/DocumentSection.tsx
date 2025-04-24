'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import { DocumentCard } from './DocumentCard';
import { PageTitle } from '@/components/Typography';
import { IDocuments } from '@/api/ResponseTypes/customer-service';
import { FormSkeleton } from '@/components/Loaders';
import {
  addGroupMemberTitle,
  accountNumber as accountNumberStyle
} from '@/features/CustomerService/Form/style';
import { useCurrentBreakpoint } from '@/utils';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';

type SubmittedNotSubmittedDocuments = {
  submitted: IDocuments[] | undefined;
  notSubmitted: IDocuments[] | undefined;
};

type Props = {
  documents: SubmittedNotSubmittedDocuments;
  loading?: boolean;
  handleSubmittedDocuments?: Function;
};

export interface IDocumentList {
  submitted: boolean;
  reqId: number;
  docname: string;
}

export const DocumentSection = ({
  documents,
  loading,
  handleSubmittedDocuments
}: Props) => {
  const [documentList, setDocumentsList] = React.useState<IDocumentList[]>([
    {
      submitted: false,
      reqId: 0,
      docname: ''
    }
  ]);

  const handleCheck = (reqId: number) => {
    setDocumentsList(
      documentList.map((document) =>
        document.reqId === reqId
          ? {
              ...document,
              submitted: !document.submitted,
              reqId: document.reqId,
              docname: document.docname
            }
          : document
      )
    );
  };

  React.useEffect(() => {
    const submitted = documentList.filter((document) => document.submitted);
    handleSubmittedDocuments?.(submitted);
  }, [documentList]);

  React.useEffect(() => {
    if (!documents) return;

    const mapDocuments = (
      docs: IDocuments[] | undefined,
      isSubmitted: boolean
    ) =>
      docs?.map((document) => ({
        submitted: isSubmitted,
        reqId: Number(document.reqid),
        docname: document.docname
      })) || [];

    const result = [
      ...mapDocuments(documents.submitted, true),
      ...mapDocuments(documents.notSubmitted, false)
    ];

    setDocumentsList(result);
  }, [documents]);

  const { isTablet } = useCurrentBreakpoint();

  return (
    <Grid mb={2}>
      <Box mt={3} mb={4}>
        <PageTitle
          title="Account Opening Document"
          styles={accountNumberStyle}
        />
        <Grid item={isTablet} mobile={12} mt={3}>
          <PageTitle
            title="Please select all the document the user provided"
            styles={{
              ...addGroupMemberTitle,
              margin: '10px 0',
              fontWeight: 400
            }}
          />
          {loading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <>
              {documents.submitted?.length === 0 &&
                documents.notSubmitted?.length === 0 && (
                  <Box mb={3} sx={{ width: '200px', height: '200px' }}>
                    <NoDataAvailable
                      message="No data available"
                      width={200}
                      height={200}
                    />
                  </Box>
                )}
              {documentList?.map((document) => (
                <DocumentCard
                  handleCheck={handleCheck}
                  isSubmitted={document.submitted}
                  key={document.reqId}
                  documentName={document.docname}
                  reqId={document.reqId}
                />
              ))}
            </>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};
