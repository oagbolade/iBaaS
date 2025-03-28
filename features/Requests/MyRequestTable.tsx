import { Box } from '@mui/material';
import React, { ChangeEvent, useContext, useState } from 'react';
import Link from 'next/link';
import { inputFields } from '../Loan/LoanDirectory/styles';
import { MyRequestsColumns } from '../Loan/LoanDirectory/COLUMN';
import { IFetchAllUserRequest } from '@/api/ResponseTypes/loans';
import { TextInput } from '@/components/FormikFields';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import { SearchIcon } from '@/assets/svg';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { formatDate } from '@/utils/formatDateAndTime';
import { RequestModuleContext } from '@/context/RequestModuleContext';
import { usePagination } from '@/utils/hooks/usePagination';

interface Props {
  allRequests?: IFetchAllUserRequest[] | undefined;
}

interface RequestProps {
  requests: IFetchAllUserRequest;
}

const MyRequestsActions = ({ requests }: RequestProps) => {
  const { setMyRequestData } = useContext(RequestModuleContext);

  const setRequestData = () => {
    setMyRequestData({
      id: requests.id,
      requestType: requests.requestType,
      requestDate: requests.requestDate,
      postingOfficer: requests.postingOfficer,
      approvingOfficer: requests.approvingOfficer
    });
  };

  return (
    /** TODO: Remove hardcoded account number once we are able to view a specific request detail **/
    <Link
      onClick={setRequestData}
      href={`/requests/view-single-my-requests/?id=${requests?.id}`}
    >
      <TableSingleAction actionName="View" />
    </Link>
  );
};

export const MyRequestTable = ({ allRequests = [] }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterFunction = (request: IFetchAllUserRequest, term: string) =>
    request.requestType.toLowerCase().includes(term.toLowerCase()) ||
    request.approvingOfficer?.toLowerCase().includes(term.toLowerCase());

  const { paginatedData, totalElements, totalPages, setPage, page } =
    usePagination<IFetchAllUserRequest>({
      data: allRequests,
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
          mainTitle="My Requests"
          secondaryTitle="See a directory of all the requests you’ve made on this platform."
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
      <MuiTableContainer
        columns={MyRequestsColumns}
        data={paginatedData}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        totalElements={totalElements}
      >
        {paginatedData.length > 0 && paginatedData[0].requestType !== '' ? (
          paginatedData.map((request: IFetchAllUserRequest) => {
            return (
              <StyledTableRow key={request.id}>
                <StyledTableCell component="th" scope="row">
                  {request.requestType}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {formatDate(request.requestDate)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {request.approvingOfficer}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <MyRequestsActions requests={request} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })
        ) : (
          <StyledTableRow>
            <StyledTableCell
              colSpan={MyRequestsColumns.length + 1}
              component="th"
              scope="row"
            >
              {renderEmptyTableBody(paginatedData)}
            </StyledTableCell>
          </StyledTableRow>
        )}
      </MuiTableContainer>
    </Box>
  );
};
