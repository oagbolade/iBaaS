import { Box } from '@mui/material';
import React, { ChangeEvent, useContext, useState } from 'react';
import Link from 'next/link';
import { inputFields } from '../Loan/LoanDirectory/styles';
import { RejectedRequestsColumns } from '../Loan/LoanDirectory/COLUMN';
import { TextInput } from '@/components/FormikFields';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import { SearchIcon } from '@/assets/svg';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { formatDate } from '@/utils/formatDateAndTime';
import { IFetchRejectedRequest } from '@/api/ResponseTypes/loans';
import { RequestModuleContext } from '@/context/RequestModuleContext';
import { usePagination } from '@/utils/hooks/usePagination';
import { FormSkeleton } from '@/components/Loaders';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

interface Props {
  rejectedRequests?: IFetchRejectedRequest[] | undefined;
}

interface RequestProps {
  requests: IFetchRejectedRequest;
}

const RejectedRequestsActions = ({ requests }: RequestProps) => {
  const { setRejectedRequestData } = useContext(RequestModuleContext);

  const setRequestData = () => {
    setRejectedRequestData({
      id: requests.id,
      requestType: requests.requestType,
      rejectDate: requests.rejectDate,
      postingOfficer: requests.postingOfficer,
      approvingOfficer: requests.approvingOfficer,
      rejectReason: requests.rejectReason
    });
  };
  return (
    /** TODO: Remove hardcoded account number once we are able to view a specific request detail **/
    <Link
      onClick={setRequestData}
      href={`/requests/view-single-rejected-request/?accountNumber=${requests?.id}`}
    >
      <TableSingleAction actionName="View" />
    </Link>
  );
};

export const RejectedRequestTable = ({ rejectedRequests = [] }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading } = useGlobalLoadingState();

  const filterFunction = (request: IFetchRejectedRequest, term: string) =>
    request?.requestType?.toLowerCase().includes(term.toLowerCase()) ||
    request?.approvingOfficer?.toLowerCase().includes(term.toLowerCase());

  const { paginatedData, totalElements, totalPages, setPage, page } =
    usePagination<IFetchRejectedRequest>({
      data: rejectedRequests,
      rowsPerPage: 10,
      searchTerm,
      filterFunction
    });

  return (
    <Box mt={1} sx={{ width: { mobile: 900, tablet: '100%' } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <CustomTableHeader
          mainTitle="Rejected Requests"
          secondaryTitle="See a directory of all the requests that have been rejected on this platform."
          hideFilterSection
        />
        <TextInput
          customStyle={{
            ...inputFields
          }}
          icon={<SearchIcon />}
          name="Search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </Box>
      {isLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <MuiTableContainer
          columns={RejectedRequestsColumns}
          data={paginatedData}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalElements={totalElements}
        >
          {paginatedData.length > 0 && paginatedData[0].requestType !== '' ? (
            paginatedData.map((request: IFetchRejectedRequest) => {
              return (
                <StyledTableRow key={request.id}>
                  <StyledTableCell component="th" scope="row">
                    {request.requestType}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {formatDate(request.rejectDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {request.rejectReason}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <RejectedRequestsActions requests={request} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={RejectedRequestsColumns.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody(paginatedData)}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      )}
    </Box>
  );
};
