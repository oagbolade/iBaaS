'use client';
import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { TopOverViewSection } from '../../Overview/TopOverViewSection';
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
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

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
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { groups } = useGetAllGroups();
  const { officers } = useGetAccountOfficers();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('group-membership');

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const { groupMembershipList, isLoading, totalRecords } =
    useGetGroupMembership({
      ...searchParams,
      page
    });

  const { groupMembershipList: downloadData } = useGetGroupMembership({
    ...searchParams,
    page,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData([]);
    }

    if (downloadData?.length > 0) {
      const groupMember = downloadData.map((item) => ({
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
  }, [downloadData]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params
    });
    setReportType('GroupMembership');
  };

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />

      <div className="mt-8">
        {branches && bankproducts && (
          <FilterSection
            branches={branches}
            officers={officers}
            groups={groups || []}
            onSearch={handleSearch}
          />
        )}
      </div>

      <div className="mx-5">
        {isGlobalLoading || isLoading ? (
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
            totalPages={Math.ceil(totalRecords / 10)}
            totalElements={totalRecords}
          >
            {searchActive ? (
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
      </div>
    </Box>
  );
};
