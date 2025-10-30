'use client';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import {
  PortfolioAccountContainer,
  PortfolioProductTilte,
  PortfolioProduct,
  PortfolioCardStyle,
  PortfolioCards,
  PortfolioContainer,
  PortfolioHeaderStyle,
  PortfolioTableCards,
  PortfolioTableText,
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
    <Box sx={PortfolioContainer}>
      <Box sx={PortfolioCards}>
        <Box sx={PortfolioTableCards}>
          <Box sx={PortfolioCardStyle}>
            <Box sx={PortfolioHeaderStyle}>
              <Box sx={PortfolioTableText}>
                <Box sx={PortfolioTitleHeader}>
                  <PageTitle
                    title={PortfolioOption.productName}
                    styles={{ ...PortfolioTitle }}
                  />
                </Box>
                <Box sx={PortfolioAccountContainer}>
                  <PageTitle
                    title="Product Code"
                    styles={{ ...PortfolioProduct }}
                  />
                  <PageTitle
                    title={PortfolioOption.productCode}
                    styles={{ ...PortfolioProductTilte }}
                  />
                </Box>
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
                <Box sx={PortfolioAccountContainer}>
                  <PageTitle
                    title="Principal at Risk"
                    styles={{ ...PortfolioProduct }}
                  />
                  <PageTitle
                    title={String(PortfolioOption.number_of_Accounts)}
                    styles={{ ...PortfolioProductTilte }}
                  />
                </Box>
                <Box sx={PortfolioAccountContainer}>
                  <PageTitle
                    title="Loan Balance"
                    styles={{ ...PortfolioProduct }}
                  />
                  <PageTitle
                    title={String(
                      `NGN ${
                        formatCurrency(PortfolioOption?.currentbalance || 0) ||
                        'N/A'
                      }`
                    )}
                    styles={{ ...PortfolioProductTilte }}
                  />
                </Box>
              </Box>
            </Box>
            <Link onClick={setContextData} href={link}>
              <TableSingleAction actionName="View" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
