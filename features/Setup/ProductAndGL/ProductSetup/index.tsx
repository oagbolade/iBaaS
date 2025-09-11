'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { TableActionMenu } from './TableActionMenu';
import { ProductForm } from './ProductForm';
import { CasaTableActionMenu } from './CasaTableAction';
import { TreasuryTableActionMenu } from './TreasuryTableAction';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useGetProductType } from '@/api/general/useProductType';
import { ISearchParams } from '@/app/api/search/route';
import {
  useFilterLoanProductSearch,
  useGetProductClass,
} from '@/api/setup/useProduct';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchLoanProductResponse } from '@/api/ResponseTypes/setup';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const ProductSetupTable = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { productTypes } = useGetProductType();
  const { products } = useGetProductClass();
  const [openModel, setopenModel] = useState(Boolean);
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('product-setup');
  const {
    totalPages,
    totalElements,
    data: productData,
    isLoading,
  } = useFilterLoanProductSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearchActive(true);
  };
  const ProductActionMenuProps = ({
    moduleCode,
    productCode,
  }: {
    moduleCode: string;
    productCode: string;
  }): React.ReactElement => {
    return (
      <Box>
        {moduleCode === '3' && (
          <TableActionMenu
            productClass={moduleCode}
            productCode={productCode}
          />
        )}
        {moduleCode === '1' && (
          <CasaTableActionMenu
            productClass={moduleCode.toString()}
            productCode={productCode}
          />
        )}
        {moduleCode === '2' && (
          <CasaTableActionMenu
            productClass={moduleCode.toString()}
            productCode={productCode}
          />
        )}
        {moduleCode === '5' && (
          <TreasuryTableActionMenu
            productClass={moduleCode.toString()}
            productCode={productCode}
          />
        )}
        {moduleCode === '4' && (
          <TreasuryTableActionMenu
            productClass={moduleCode.toString()}
            productCode={productCode}
          />
        )}
      </Box>
    );
  };
  const handleClose = () => {
    setopenModel(false);
  };
  const handleOpen = () => {
    setopenModel(true);
  };
  const actionButtons = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        buttonTitle="Add New Product"
        customStyle={{ ...submitButton }}
        onClick={handleOpen}
      />
      {openModel && (
        <ModalContainerV2 form={<ProductForm handleClose={handleClose} />} />
      )}
    </Box>,
  ];

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        {productTypes !== undefined && (
          <FilterSection
            productTypes={productTypes}
            onSearch={handleSearch}
            products={products}
          />
        )}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        { isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            data={productData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Products',
              secondaryTitle:
                'See a directory of all products setup in this system.',
            }}
            ActionMenuProps={ProductActionMenuProps}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {searchActive ? (
              productData?.map((dataItem: SearchLoanProductResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.productCode || 'NIL'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.productName || 'NIL'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.productTypeDesc || 'NIL'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.productClass || 'NIL'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ProductActionMenuProps
                        moduleCode={dataItem?.moduleCode?.toString()}
                        productCode={dataItem?.productCode}
                      />
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
                  {renderEmptyTableBody(productData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
