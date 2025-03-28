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
import {
  CheckboxInput,
  FormSelectInput,
  TextInput
} from '@/components/FormikFields';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { useCurrentBreakpoint } from '@/utils';
import { Role } from '@/constants/Administrator/selectOptions';
import { SearchIcon } from '@/assets/svg';
import { useAuthPriviledge } from '@/api/general/useAuthPriviledge';
import { useDataCapture } from '@/api/general/useDataCapture';
import { checkboxTypography } from '@/components/FormikFields/styles';
import { IPriviledgeList } from '@/api/ResponseTypes/general';
import {
  addMenuIdToList,
  removeMenuIdFromList,
  isMenuIDInList,
  getMenuIDs,
  MenuIDList
} from '@/utils/getCheckedMenus';
import colors from '@/assets/colors';

type Props = {
  title: string;
  authPriviledge?: boolean;
  setSumbissionCheckList?: Function;
};

export const chunkArray = (
  chunkSize: number,
  array: IPriviledgeList[] | undefined
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

export const PrivilegeSection = ({
  title,
  authPriviledge,
  setSumbissionCheckList
}: Props) => {
  const { setWidth, isMobile } = useCurrentBreakpoint();
  const { dataCapture } = useDataCapture();
  const { authPriv } = useAuthPriviledge();
  const pickPriviledgeType = authPriviledge ? authPriv : dataCapture;
  const [priviledgeType, setPriviledgeType] = React.useState<IPriviledgeList[]>(
    []
  );

  useEffect(() => {
    setPriviledgeType(pickPriviledgeType as []);
  }, [pickPriviledgeType]);

  const chuchSize = 5;
  const chunkedData = chunkArray(chuchSize || [], (priviledgeType as []) || []);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [roleName, setRoleName] = React.useState<string>('');
  const [checkList, setCheckList] = React.useState<MenuIDList>([]);

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;

    const dataCaptureContainers =
      document.getElementsByClassName('dataCapture');
    const authPriviledgeContainers =
      document.getElementsByClassName('authPriviledge');
    const menuIDs = getMenuIDs(
      authPriviledge ? authPriviledgeContainers : dataCaptureContainers
    );

    if (newCheckedState) {
      const allMenuIDs: MenuIDList =
        chunkedData?.flatMap((chunk) =>
          chunk.map((data) => ({ menu_id: parseInt(data.menu_id, 10) }))
        ) ?? [];
      setCheckList(allMenuIDs);
      setSumbissionCheckList?.(allMenuIDs);
    } else {
      setCheckList([]);
      setSumbissionCheckList?.([]);
    }

    setChecked(newCheckedState);
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    const menuID = Number(name);
    const isInList = isMenuIDInList(checkList, menuID);

    let updatedCheckList: MenuIDList;

    if (isInList) {
      updatedCheckList = removeMenuIdFromList(checkList, menuID);
    } else {
      updatedCheckList = addMenuIdToList(checkList, Number(name));
    }
    setCheckList(updatedCheckList);
    setSumbissionCheckList?.(updatedCheckList);
    setChecked(updatedCheckList.length === chunkedData?.flat().length);
  };

  useEffect(() => {
    if (roleName.trim().length === 0) {
      setPriviledgeType(pickPriviledgeType as []);
    }
  }, [roleName]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRoleName(event.target.value);

    const filteredPriviledge = priviledgeType?.filter((item) =>
      item.menu_name.toLowerCase().includes(value.toLocaleLowerCase())
    );

    setPriviledgeType(filteredPriviledge);
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

  return (
    <Box my={2}>
      <Divider />
      <PageTitle title={title} styles={shortTitle} />
      <Typography sx={detailsDescription}>
        Please select charge that would want to allow
      </Typography>
      <Grid mb={3} container>
        <Grid tablet={6} mobile={12}>
          <FormControlLabel
            sx={checkboxTypography}
            label="Select all Permissions"
            control={<Checkbox checked={checked} onChange={handleCheckAll} />}
          />
        </Grid>

        <Grid tablet={6} mobile={12} mt={{ mobile: 2, desktop: 0 }}>
          <FormSelectInput
            customStyle={{
              width: setWidth(isMobile ? '300px' : '100%'),
              fontSize: '14px',
              ...inputFields
            }}
            name="role"
            options={Role.roles}
            label="Copy Permission from"
            placeholder="Role"
          />{' '}
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
        {chunkedData?.map((chunk) => (
          <>
            {chunk.map((data: { menu_id: string; menu_name: string }) => (
              <Grid my={1.5} key={data.menu_id} item mobile={12} desktop={4}>
                <CheckBoxWrapper>
                  <CheckboxInput
                    checkList={checkList}
                    handleCheck={handleCheck}
                    id={
                      authPriviledge
                        ? `authPriviledge-${data.menu_id}`
                        : `dataCapture-${data.menu_id}`
                    }
                    className={
                      authPriviledge ? 'authPriviledge' : 'dataCapture'
                    }
                    name={data.menu_id}
                    label={data.menu_name}
                  />
                </CheckBoxWrapper>
              </Grid>
            ))}
          </>
        ))}
      </Grid>
    </Box>
  );
};
