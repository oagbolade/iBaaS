'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import Link from 'next/link';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {
  Box,
  Stack,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton
} from '@mui/material';
import AnimateHeight, { Height } from 'react-animate-height';
// eslint-disable-next-line import/no-cycle
import DOMPurify from 'dompurify';
import { FilterSection } from './FilterSection';
import { CheckBoxWrapper } from './styles';
import { COLUMNS } from './COLUMNS';
import { chunkArray } from '@/features/Administrator/Role/CreateRole/PrivilegeSection';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import {
  useFilterUserByRoleSearch,
  useGetAssignedAuthPriviledgesByRoleID,
  useGetAssignedDataCaptureByRoleID,
  useGetRoleByID
} from '@/api/admin/useRole';
import { FormSkeleton } from '@/components/Loaders';
import { ISearchParams } from '@/app/api/search/route';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchUserbyRoleResponse } from '@/api/ResponseTypes/admin';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';

const Accordion = styled((props: AccordionProps) => {
  return (
    <MuiAccordion
      disableGutters
      square
      {...props}
      sx={{ border: '1px solid red' }}
    />
  );
})(() => {
  return {
    borderRadius: '12px',
    border: `1px solid ${colors.neutral300}`,
    boxShadow: 'none'
  };
});

const AccordionSummary = styled((props: AccordionSummaryProps) => {
  return <MuiAccordionSummary {...props} />;
})(({ theme }) => {
  return {
    background: '#F9FBFC',
    cursor: 'pointer',
    borderTop: `1px solid ${colors.neutral300}`,
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center'
    }
  };
});

const AccordionDetails = styled(MuiAccordionDetails)(() => {
  return {
    padding: 0
  };
});

type Props = {
  title?: string;
};
export const SubTitle = ({ title }: Props) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        textTransform: 'uppercase'
      }}
    >
      {title}
    </Typography>
  );
};

export const Details = ({ title }: Props) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral900}`,
        fontSize: { mobile: '12px', desktop: '16px' },
        fontWeight: 600,
        lineHeight: '24px',
        marginBottom: '24px'
      }}
    >
      {title}
    </Typography>
  );
};

export const MainTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        color: `${colors.neutral700}`,
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',
        textTransform: 'uppercase',
        marginBottom: '24px'
      }}
    >
      <u>{title}</u>
    </Typography>
  );
};

export const LargeTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      sx={{
        fontSize: { mobile: '14px', desktop: '20px' },
        fontWeight: 700,
        lineHeight: { mobile: '20px', desktop: '32px' },
        textWrap: 'wrap'
      }}
    >
      {title}
    </Typography>
  );
};

export const ViewRole = () => {
  const [search, setSearch] = React.useState<boolean>(false);
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<Height>(350);
  const roleid = useGetParams('roleid') || '';
  const [searchParams, setSearchParams] = React.useState<ISearchParams | null>(
    null
  );
  const [page, setPage] = React.useState(1);
  const {
    totalPages,
    totalElements,
    data: usersData,
    isLoading: areUsersDataLoading
  } = useFilterUserByRoleSearch({
    ...searchParams,
    page
  });

  const { setDirection } = useSetDirection();
  const chuchSize = 5;

  const { role, isLoading } = useGetRoleByID(encryptData(roleid));
  const { dataCapture, isLoading: isDataCaptureLoading } =
    useGetAssignedDataCaptureByRoleID(encryptData(roleid));
  const { authPriv, isLoading: isAuthPrivLoading } =
    useGetAssignedAuthPriviledgesByRoleID(encryptData(roleid));
  const chunckedDataCaptureList = chunkArray(chuchSize, dataCapture);
  const chunckedAuthPrivList = chunkArray(chuchSize, authPriv);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      return setHeight(350);
    }
    setHeight('auto');
  };

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenuProps = ({ userid }: { userid: string }) => {
    return (
      <Link
        href={`/admin/users/update?isEditing=true&userid=${DOMPurify.sanitize(userid)}`}
      >
        <TableSingleAction actionName="View" />
      </Link>
    );
  };

  const Divider: React.FC = () => {
    return (
      <Box
        sx={{
          width: '96%',
          margin: '0 auto',
          borderBottom: '1px solid var(--colour-neutral-neutral-300, #E1E6ED)'
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        margin: '20px 0'
      }}
    >
      <TopActionsArea customStyle={{ width: '100%' }} />
      <AdminContainer>
        <Accordion
          sx={{ width: { mobile: '100%', desktop: '100%' } }}
          onChange={() => {
            return handleChange();
          }}
        >
          <AccordionDetails>
            <AnimateHeight id="example-panel" duration={350} height={height}>
              <Stack
                direction={setDirection()}
                sx={{
                  padding: { mobile: '15px 20px', desktop: '30px 40px' },
                  background: `${colors.primaryBlue100}`
                }}
                spacing={2}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2}>
                  <Box mt={1.2}>
                    <LargeTitle title={role?.role_name || 'N/A'} />
                    <Typography
                      sx={{
                        fontSize: { mobile: '10px', desktop: '14px' },
                        fontWeight: 400,
                        lineHeight: '20px'
                      }}
                    >
                      ID:{roleid || 'N/A'}{' '}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Box
                sx={{
                  padding: {
                    mobile: '10px 17px',
                    desktop: '30px 32px 0px 32px'
                  }
                }}
              >
                <MainTitle title="Role Details" />
              </Box>

              <Stack direction={setDirection()}>
                <Box
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' }
                  }}
                >
                  <SubTitle title="Role name" />
                  <Details title={role?.role_name || 'N/A'} />

                  <SubTitle title="Role Level" />
                  <Details title={role?.roleLevel || 'N/A'} />
                </Box>
                <Box
                  sx={{
                    width: { mobile: '20%', desktop: '60%' },
                    padding: { mobile: '10px 17px', desktop: '20px 32px' },
                    display: { desktop: 'grid' },
                    justifyContent: { desktop: 'center' }
                  }}
                >
                  <SubTitle title="Idle time out" />
                  <Details title={role?.userTimeOut || 'N/A'} />

                  <SubTitle title="Role Description" />
                  <Details title={role?.roledesc || 'N/A'} />
                </Box>
                <Box
                  sx={{
                    width: '20%',
                    padding: { mobile: '10px 17px', desktop: '20px 32px' }
                  }}
                >
                  <SubTitle title="Access Days" />
                  <Details title={role?.access_days || 'N/A'} />
                </Box>
              </Stack>
              <Divider />
              <Box
                sx={{
                  padding: {
                    mobile: '10px 17px',
                    desktop: '30px 32px 0px 32px'
                  }
                }}
              >
                <MainTitle title="Data capture privileges" />
              </Box>
              {isDataCaptureLoading ? (
                <Box m={16}>
                  <FormSkeleton noOfLoaders={3} />
                </Box>
              ) : (
                <Grid container>
                  {chunckedDataCaptureList?.map((chunk) => (
                    <>
                      {chunk.map(
                        (data: { menu_id: string; menu_name: string }) => (
                          <Grid
                            p={0}
                            key={data.menu_id}
                            tablet={3}
                            mobile={12}
                            sx={{
                              width: '20%',
                              padding: {
                                mobile: '10px 17px',
                                desktop: '5px 32px'
                              }
                            }}
                          >
                            <CheckBoxWrapper>
                              <FormControlLabel
                                disabled
                                control={<Checkbox defaultChecked />}
                                label={data.menu_name}
                              />
                            </CheckBoxWrapper>
                          </Grid>
                        )
                      )}
                    </>
                  ))}{' '}
                </Grid>
              )}

              <Divider />

              <Box
                sx={{
                  padding: {
                    mobile: '10px 17px',
                    desktop: '30px 32px 0px 32px'
                  }
                }}
              >
                <MainTitle title="Authorisation privileges" />
              </Box>
              {isAuthPrivLoading ? (
                <Box m={16}>
                  <FormSkeleton noOfLoaders={3} />
                </Box>
              ) : (
                <Grid container>
                  {chunckedAuthPrivList?.map((chunk) => (
                    <>
                      {chunk.map(
                        (data: { menu_id: string; menu_name: string }) => (
                          <Grid
                            p={0}
                            key={data.menu_id}
                            tablet={3}
                            mobile={12}
                            sx={{
                              width: '20%',
                              padding: {
                                mobile: '10px 17px',
                                desktop: '5px 32px'
                              }
                            }}
                          >
                            <CheckBoxWrapper>
                              <FormControlLabel
                                disabled
                                control={<Checkbox defaultChecked />}
                                label={data.menu_name}
                              />
                            </CheckBoxWrapper>
                          </Grid>
                        )
                      )}
                    </>
                  ))}{' '}
                </Grid>
              )}
            </AnimateHeight>

            <AccordionSummary>
              <IconButton onClick={handleClick}>
                <Stack
                  ref={expandRef}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography mr={1} sx={{ textAlign: 'center' }}>
                    Click to {isOpen ? 'hide' : 'view more details'} {isOpen}
                  </Typography>
                  <Box mt={0.6}>
                    <ChevronDown />
                  </Box>
                </Stack>
              </IconButton>
            </AccordionSummary>
          </AccordionDetails>
        </Accordion>

        <Box mt={8} sx={{ width: '100%' }}>
          <FilterSection onSearch={handleSearch} />

          {areUsersDataLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              tableConfig={{
                hasActions: true
              }}
              showHeader={{
                mainTitle: 'Users',
                secondaryTitle: 'See a directory of all users for this role',
                hideFilterSection: true
              }}
              data={usersData}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              totalElements={totalElements}
              ActionMenuProps={ActionMenuProps}
            >
              {search ? (
                usersData?.map((dataItem: SearchUserbyRoleResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.fullname || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.userId || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.email || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.phoneno || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {role?.userTimeOut || 'N/A'} Minute(s)
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <ActionMenuProps userid={dataItem.userId || 'N/A'} />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMNS.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(usersData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          )}
        </Box>
      </AdminContainer>
    </Box>
  );
};
