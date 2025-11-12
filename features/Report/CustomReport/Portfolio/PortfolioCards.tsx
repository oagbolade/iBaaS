'use client';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import {
  PortfolioAccountContainer,
  PortfolioProductTilte,
  PortfolioProduct,
  // PortfolioCardStyle,
  // PortfolioCards,
  // PortfolioContainer,
  // PortfolioHeaderStyle,
  // PortfolioTableCards,
  // PortfolioTableText,
  PortfolioTitle,
  PortfolioTitleHeader
} from './style';
import { PageTitle } from '@/components/Typography';
import { TableSingleAction } from '@/components/Table';
import { IPortfolioAtRiskProduct } from '@/api/ResponseTypes/reports';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

type Props = {
  PortfolioOption: IPortfolioAtRiskProduct;
  link?: string;
  contextSetter: Dispatch<SetStateAction<IPortfolioAtRiskProduct>>;
};

export const PortfolioCard = ({
  PortfolioOption,
  link = '',
  contextSetter
}: Props) => {
  const setContextData = () => {
    contextSetter(PortfolioOption);
  };

  return (
    <div className="grid grid-cols-6 gap-4 mb-4 py-4 px-5 border shadow items-center w-full">
      <div className="col-span-1">
        <Box sx={PortfolioTitleHeader}>
          <PageTitle
            title={PortfolioOption.productName}
            styles={{ ...PortfolioTitle }}
          />
        </Box>
      </div>
      <div className="col-span-1">
        <Box sx={PortfolioAccountContainer}>
          <PageTitle title="Product Code" styles={{ ...PortfolioProduct }} />
          <PageTitle
            title={PortfolioOption.productCode}
            styles={{ ...PortfolioProductTilte }}
          />
        </Box>
      </div>
      <div className="col-span-1">
        <Box sx={PortfolioAccountContainer}>
          <PageTitle
            title="Number of Accounts"
            styles={{ ...PortfolioProduct }}
          />
          <PageTitle
            title={String(PortfolioOption.number_of_Accounts)}
            styles={{ ...PortfolioProductTilte }}
          />
        </Box>
      </div>
      <div className="col-span-1">
        <Box sx={PortfolioAccountContainer}>
          <PageTitle
            title="Principal at Risk"
            styles={{ ...PortfolioProduct }}
          />
          <PageTitle
            title={String(
              `NGN ${
                formatCurrency(PortfolioOption?.principal_At_Risk || 0) || 'N/A'
              }`
            )}
            styles={{ ...PortfolioProductTilte }}
          />
        </Box>
      </div>
      <div className="col-span-1">
        <Box sx={PortfolioAccountContainer}>
          <PageTitle title="Loan Balance" styles={{ ...PortfolioProduct }} />
          <PageTitle
            title={String(
              `NGN ${
                formatCurrency(PortfolioOption?.currentbalance || 0) || 'N/A'
              }`
            )}
            styles={{ ...PortfolioProductTilte }}
          />
        </Box>
      </div>
      <div className="col-span-1">
        <Link onClick={setContextData} href={link}>
          <TableSingleAction actionName="View" />
        </Link>
      </div>
    </div>
  );
};
