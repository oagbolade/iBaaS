'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { Column } from './Column';
import { MuiTableContainer } from '@/components/Table';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetAllProduct } from '@/api/setup/useProduct';
import { ISearchParams } from '@/app/api/search/route';
import { useGetGroupMembership } from '@/api/reports/useGroupMembership';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';
import { useGetAllGroups } from '@/api/general/useGroup';
import { useGetAccountOfficers } from '@/api/admin/useAccountOfficer';
import colors from '@/assets/colors';

interface ActionMenuProps {
  detail: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ detail }) => {
  return (
    <Link
      href={`/report/custom-report/view-report/?getGroupMembership=groupMembership&groupDetail=${detail}`}
      style={{ color: `${colors.activeBlue400}` }}
    >
      View
    </Link>
  );
};

export const GroupMembership = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { groups } = useGetAllGroups();
  const { officers } = useGetAccountOfficers();

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const { groupMembershipList, isLoading } = useGetGroupMembership({
    ...searchParams,
    page
  });

  React.useEffect(() => {
    if (groupMembershipList?.length > 0) {
      const groupMember = groupMembershipList.map((item) => ({
        groupid: item.groupID,
        groupName: item.groupName,
        customerId: item.customerId,
        fullName: item.fullName,
        status: item.status,
        phone: item.phone,
        bvn: item.bvn,
        address: item.address,
        branchName: item.branchName,
        officer: item.officer,
        gender: item.gender,
        createdate: item.createdate
      }));

      setExportData(groupMember as []);
      setReportType('GroupMembership');
    }
  }, [groupMembershipList, setReportType, setExportData]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams({
      ...params
    });
    setReportType('GroupMembership');
  };

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      {branches && bankproducts && (
        <FilterSection
          branches={branches}
          officers={officers}
          groups={groups || []}
          onSearch={handleSearch}
        />
      )}

      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={Column}
            data={groupMembershipList}
            showHeader={{
              mainTitle: 'Group Membership Report',
              secondaryTitle:
                'See a directory of all Group Membership Report in this system.',
              hideFilterSection: true
            }}
            setPage={setPage}
            page={page}
            ActionMenuProps={ActionMenu}
          >
            {search ? (
              groupMembershipList?.map((dataItem: any, index: number) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.groupID}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.groupName}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem.customerId || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.fullName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Status
                        label={
                          dataItem?.status === 'Active' ? 'Active' : 'active'
                        }
                        status={
                          dataItem?.status === 'Active' ? 'success' : 'inactive'
                        }
                      />{' '}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.phone || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <ActionMenu detail={JSON.stringify(dataItem) as string} />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={Column.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(groupMembershipList)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
