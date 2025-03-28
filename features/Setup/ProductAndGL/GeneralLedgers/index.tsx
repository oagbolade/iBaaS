'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { sanitize } from 'dompurify';
import { FilterSection } from './FilterSection';
import { NodeColumns } from './Node_COLUMNS';
import { classColumns } from './Class_COLUMNS';
import { GLClassFilterSection } from './ClassFilterSection';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import { tabStyle } from '@/features/Setup/ProductAndGL/style';
import { TabsV2 } from '@/components/Revamp/TabsV2';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { useFilterGLNodeSearch } from '@/api/setup/useGeneralNode';
import { ISearchParams } from '@/app/api/search/route';
import { useGetStatus } from '@/api/general/useStatus';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import {
  SearchGLClassResponse,
  SearchGLNodeResponse
} from '@/api/ResponseTypes/setup';
import { useFilterGLClassSearch } from '@/api/setup/useGeneralClass';
import { Status } from '@/components/Labels';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/product-gl/add-gl-node">
      <PrimaryIconButton
        buttonTitle="Add GL Node"
        customStyle={{ ...submitButton }}
      />
    </Link>

    <Link href="/setup/product-gl/add-gl-class">
      <ActionButton
        customStyle={{ ...cancelButton }}
        buttonTitle="Add GL Class"
      />
    </Link>
  </Box>
];

type ClassProps = {
  onSearch: (params: ISearchParams) => Promise<void>;
  searchParams: ISearchParams | null;
  search: boolean;
};
type NodeProps = {
  onSearch: (params: ISearchParams) => Promise<void>;
  searchParams: ISearchParams | null;
  search: boolean;
};

const GLNodeTable = ({ onSearch, search, searchParams }: NodeProps) => {
  const [page, setPage] = useState(1);
  const {
    totalPages,
    totalElements,
    data: glNodeData,
    isLoading
  } = useFilterGLNodeSearch({ ...searchParams, page });
  const ActionMenu = ({
    glNodeCode,
    prodCode
  }: {
    glNodeCode: string;
    prodCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/product-gl/add-gl-node?isEditing=true&id=${sanitize(glNodeCode)}&node=${sanitize(prodCode)}`}
      >
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <MuiTableContainer
          columns={NodeColumns}
          data={glNodeData}
          showHeader={{
            hideFilterSection: true,
            mainTitle: 'GL Node',
            secondaryTitle:
              'See a directory of all GL Node setup in this system.'
          }}
          ActionMenuProps={ActionMenu}
          totalPages={totalPages}
          setPage={setPage}
          totalElements={totalElements}
          page={page}
        >
          {search ? (
            glNodeData?.map((dataItem: SearchGLNodeResponse) => {
              return (
                <StyledTableRow key={dataItem.userId}>
                  <StyledTableCell component="th" scope="row">
                    {dataItem.gl_NodeCode}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.gl_NodeName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.prodCode}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Status
                      label={
                        Number(dataItem.glNodeStatus) === 1
                          ? 'Active'
                          : 'Inactive'
                      }
                      status={
                        Number(dataItem.glNodeStatus) === 1
                          ? 'success'
                          : 'warning'
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ActionMenu
                      glNodeCode={dataItem.gl_NodeCode}
                      prodCode={dataItem.prodCode}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={NodeColumns.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody(glNodeData)}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      )}
    </Box>
  );
};

const GLClassTable = ({ onSearch, searchParams, search }: ClassProps) => {
  const [page, setPage] = useState(1);
  const {
    totalPages,
    totalElements,
    data: glClassData,
    isLoading
  } = useFilterGLClassSearch({ ...searchParams, page });

  const ActionMenu = ({
    glClassCode
  }: {
    glClassCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/product-gl/add-gl-class?isEditing=true&id=${glClassCode}`}
      >
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <MuiTableContainer
          columns={classColumns}
          data={glClassData}
          showHeader={{
            mainTitle: 'GL Class',
            secondaryTitle:
              'See a directory of all GL Class setup in this system.',
            hideFilterSection: true
          }}
          ActionMenuProps={ActionMenu}
          totalPages={totalPages}
          setPage={setPage}
          totalElements={totalElements}
          page={page}
        >
          {search ? (
            glClassData?.map((dataItem: SearchGLClassResponse) => {
              return (
                <StyledTableRow key={dataItem.userId}>
                  <StyledTableCell component="th" scope="row">
                    {dataItem.gl_ClassCode}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.gl_ClassName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Status
                      label={
                        Number(dataItem.status) === 1 ? 'Active' : 'Inactive'
                      }
                      status={
                        Number(dataItem.status) === 1 ? 'success' : 'warning'
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <ActionMenu glClassCode={dataItem.gl_ClassCode} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={classColumns.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody(glClassData)}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      )}
    </Box>
  );
};

const tabTitle = ['GL Node', 'GL Class'];
const PreviewTable = () => {
  const [value, setValue] = useState(0);
  const { status } = useGetStatus();
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [search, setSearch] = useState<boolean>(false);
  const [nodeSearch, setNodeSearch] = useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleNodeSearch = async (params: any) => {
    setSearchParams(params);
    setNodeSearch(true);
  };

  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };
  const pageMenu = [
    <GLNodeTable
      onSearch={handleNodeSearch}
      searchParams={searchParams}
      search={nodeSearch}
    />,
    <GLClassTable
      onSearch={handleSearch}
      searchParams={searchParams}
      search={search}
    />
  ];
  return (
    <Box>
      {value === 0 && (
        <Box>
          {status !== undefined && (
            <FilterSection
              status={status}
              onSearch={handleNodeSearch}
              placeholderProp="search GL Node"
            />
          )}
        </Box>
      )}
      {value === 1 && (
        <Box>
          {status !== undefined && (
            <GLClassFilterSection
              status={status}
              onSearch={handleSearch}
              placeholderProp="search GL Class"
            />
          )}
        </Box>
      )}
      <TabsV2
        tabTitle={tabTitle}
        pageMenu={pageMenu}
        handleChange={handleChange}
        values={value}
        customStyle={{ ...tabStyle }}
      />
    </Box>
  );
};

export const GlAndClassContainer = () => {
  return (
    <Box sx={{ marginTop: '60px' }}>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '20px' }}>
        <PreviewTable />
      </Box>
    </Box>
  );
};
