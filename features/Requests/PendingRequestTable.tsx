import React, { ChangeEvent, useContext, useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { PendingRequestsColumns } from '../Loan/LoanDirectory/COLUMN';
import { inputFields } from '../Loan/LoanDirectory/styles';
import { IGetPendingRequest } from '@/api/ResponseTypes/loans';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import { TextInput } from '@/components/FormikFields';
import { SearchIcon } from '@/assets/svg';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { formatDate } from '@/utils/formatDateAndTime';
import { RequestModuleContext } from '@/context/RequestModuleContext';
import { usePagination } from '@/utils/hooks/usePagination';

interface Props {
  pendingRequests?: IGetPendingRequest[] | undefined;
}

interface RequestProps {
  requests: IGetPendingRequest;
}

const PendingRequestsActions = ({ requests }: RequestProps) => {
  const { setPendingRequestData } = useContext(RequestModuleContext);

  const setRequestData = () => {
    setPendingRequestData({
      id: requests.id,
      tablename: requests.tablename,
      authdesc: requests.authdesc,
      authid: requests.authid,
      posttype: requests.posttype,
      createdate: requests.createdate,
      authstatus: requests.authstatus,
      searchfield: requests.searchfield,
      authdate: requests.authdate,
      latestupdate: requests.latestupdate,
      post_user: requests.post_user,
      narration: requests.narration
    });
  };

  return (
    /** TODO: Remove hardcoded account number once we are able to view a specific request detail **/
    <Link
      onClick={setRequestData}
      href={`/requests/view-single-pending-request/?id=${requests?.id}`}
    >
      <TableSingleAction actionName="View" />
    </Link>
  );
};

export const PendingRequestTable = ({ pendingRequests = [] }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filterFunction = (request: IGetPendingRequest, term: string) =>
    request.posttype.toLowerCase().includes(term.toLowerCase()) ||
    request.post_user?.toLowerCase().includes(term.toLowerCase());

  const { paginatedData, totalElements, totalPages, setPage, page } =
    usePagination<IGetPendingRequest>({
      data: pendingRequests,
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
          mainTitle="Pending Requests"
          secondaryTitle="See a directory of all pending requests you’ve made on this platform."
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
        columns={PendingRequestsColumns}
        data={paginatedData}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        totalElements={totalElements}
      >
        {paginatedData && paginatedData.length > 0 ? (
          paginatedData.map((request: IGetPendingRequest) => (
            <StyledTableRow key={request.id}>
              <StyledTableCell component="th" scope="row">
                {request.posttype}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {formatDate(request?.createdate)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {request.post_user}
              </StyledTableCell>
              <StyledTableCell align="right">
                <PendingRequestsActions requests={request} />
              </StyledTableCell>
            </StyledTableRow>
          ))
        ) : (
          <StyledTableRow>
            <StyledTableCell
              colSpan={PendingRequestsColumns.length + 1}
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
