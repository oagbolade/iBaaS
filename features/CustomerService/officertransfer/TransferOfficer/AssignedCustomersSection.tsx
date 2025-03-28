import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  detailsDescription,
  shortTitle
} from '@/components/CustomCardsReports/style';
import { PageTitle } from '@/components/Typography';
import { CheckboxInput, TextInput } from '@/components/FormikFields';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { useCurrentBreakpoint } from '@/utils';
import { SearchIcon } from '@/assets/svg';
import { checkboxTypography } from '@/components/FormikFields/styles';
import {
  isAccountNumberInList,
  removeAccountNumberFromList,
  addAccountNumberToList
} from '@/utils/getCheckedMenus';
import colors from '@/assets/colors';
import { FormSkeleton } from '@/components/Loaders';
import { useGetCustomerAccountsByOfficerCode } from '@/api/admin/useAccountOfficer';
import { IAccounts } from '@/api/ResponseTypes/admin';
import { encryptData } from '@/utils/encryptData';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';

type Props = {
  title: string;
  transferFromId?: string;
  setSumbissionCheckList?: Function;
};

export const chunkArray = (
  chunkSize: number,
  array: IAccounts[] | undefined
) => {
  if (array !== undefined) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
};

const CheckBoxWrapper = styled.section`
  .MuiTypography-root {
    font-size: 12px;
    width: 126px;
  }
`;

export const AssignedCustomersSection = ({
  title,
  transferFromId,
  setSumbissionCheckList
}: Props) => {
  const [checkList, setCheckList] = React.useState<IAccounts[]>([]);
  const { setWidth, isMobile } = useCurrentBreakpoint();

  const { accounts, isLoading: areCustomerAccountsLoading } =
    useGetCustomerAccountsByOfficerCode(
      encryptData(transferFromId as string) || ''
    );

  const [filteredCustomers, setFilteredCustomers] = React.useState<IAccounts[]>(
    []
  );

  useEffect(() => {
    setFilteredCustomers(accounts as []);
  }, [accounts]);

  const chuchSize = 2;
  const chunkedData = chunkArray(
    chuchSize || [],
    (filteredCustomers as []) || []
  );
  const [checked, setChecked] = React.useState<boolean>(false);
  const [customerName, setCustomerName] = React.useState<string>('');

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;

    if (newCheckedState) {
      const allMenuIDs: any =
        chunkedData?.flatMap((chunk) =>
          chunk.map((data) => ({
            accountNumber: data.accountNumber,
            id: data.customerId
          }))
        ) ?? [];
      setCheckList(allMenuIDs);
      setSumbissionCheckList?.(allMenuIDs);
    } else {
      setCheckList([]);
      setSumbissionCheckList?.([]);
    }

    setChecked(newCheckedState);
  };

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    customerId?: string
  ) => {
    const { name } = event.target;

    const menuID = Number(name);
    const isInList = isAccountNumberInList(checkList, menuID);

    let updatedCheckList: IAccounts[];

    if (isInList) {
      updatedCheckList = removeAccountNumberFromList(checkList, menuID);
    } else {
      updatedCheckList = addAccountNumberToList(checkList, name, customerId);
    }

    setCheckList(updatedCheckList);
    setSumbissionCheckList?.(updatedCheckList);
    setChecked(updatedCheckList.length === chunkedData?.flat().length);
  };

  useEffect(() => {
    if (customerName.trim().length === 0) {
      setFilteredCustomers(accounts as []);
    }
  }, [customerName]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCustomerName(event.target.value);

    const filteredPriviledge = accounts?.filter((item) =>
      item.accountTitle?.toLowerCase().includes(value.toLocaleLowerCase())
    );

    setFilteredCustomers(filteredPriviledge);
  };

  const Divider: React.FC = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          top: '20',
          width: '100%',
          margin: '20px auto',
          borderBottom: `1px solid ${colors.neutral300}`
        }}
      />
    );
  };

  if (areCustomerAccountsLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box sx={{width: '100%'}} my={2}>
      <Divider />
      <PageTitle title={title} styles={shortTitle} />
      <Typography sx={{ ...detailsDescription, width: '454px' }}>
        Please select customer(s) you would like to transfer to officer
      </Typography>
      <Grid mb={3} container>
        <Grid tablet={6} mobile={12}>
          <FormControlLabel
            sx={checkboxTypography}
            label="Select all Customers"
            control={<Checkbox checked={checked} onChange={handleCheckAll} />}
          />
        </Grid>
      </Grid>
      <Box mb={{ mobile: 2, desktop: 0 }}>
        <TextInput
          customStyle={{
            width: setWidth(isMobile ? '300px' : '100%'),
            fontSize: '14px',
            ...inputFields
          }}
          icon={<SearchIcon />}
          name="search"
          placeholder="Search"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(event);
          }}
          value={customerName}
        />{' '}
      </Box>
      <Grid
        sx={{
          height: '328px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          '::-webkit-scrollbar': {
            width: '4px',
            border: '1px solid #d5d5d5'
          },
          '::-webkit-scrollbar-track': {
            borderRadius: '0',
            background: '#eeeeee'
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: '0',
            background: '#b0b0b0'
          }
        }}
        container
      >
        {chunkedData?.length === 0 && (
          <NoDataAvailable message="No customers available" />
        )}
        {chunkedData?.map((chunk) => (
          <>
            {chunk.map(
              (data: {
                accountNumber?: string;
                accountTitle?: string;
                customerId?: string;
              }) => (
                <Grid
                  my={1.5}
                  key={data.accountNumber}
                  item
                  mobile={12}
                  desktop={6}
                >
                  <CheckBoxWrapper>
                    <CheckboxInput
                      customerAccountList={checkList}
                      handleCheck={(e) => handleCheck(e, data.customerId)}
                      id={data.accountNumber}
                      name={data.accountNumber}
                      label={`${data.accountTitle}: ${data.accountNumber}`}
                    />
                  </CheckBoxWrapper>
                </Grid>
              )
            )}
          </>
        ))}
      </Grid>
    </Box>
  );
};
