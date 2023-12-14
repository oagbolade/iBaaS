'use client';
import { Box } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { PageTitle } from '@/components/Typography';
import { TableSingleAction } from '@/components/Table';
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
  PortfolioTitleHeader,
} from './style';

interface portfolioName {
  title: string;
  productCode: string;
  numberOfAccounts: string;
  PrincipalatRiskNumber: string;
  LoanBalanceNumber: string;
  producttitle: string;
  PrincipalatRisk: string;
  LoanBalance: string;
  numberOfAccountCode: string;
}

type Props = {
  PortfolioOption: portfolioName[];
  link?: string;
};

export const PortfolioCard = ({ PortfolioOption, link = '' }: Props) => {
  return (
    <Box sx={PortfolioContainer}>
      {PortfolioOption.map((option) => (
        <Box sx={PortfolioCards}>
          <Box sx={PortfolioTableCards}>
            <Box sx={PortfolioCardStyle}>
              <Box sx={PortfolioHeaderStyle}>
                <Box sx={PortfolioTableText}>
                  <Box sx={PortfolioTitleHeader}>
                    <PageTitle
                      title={option.title}
                      styles={{ ...PortfolioTitle }}
                    />
                  </Box>
                  <Box sx={PortfolioAccountContainer}>
                    <PageTitle
                      title={option.producttitle}
                      styles={{ ...PortfolioProduct }}
                    />
                    <PageTitle
                      title={option.productCode}
                      styles={{ ...PortfolioProductTilte }}
                    />
                  </Box>
                  <Box sx={PortfolioAccountContainer}>
                    <PageTitle
                      title={option.numberOfAccounts}
                      styles={{ ...PortfolioProduct }}
                    />
                    <PageTitle
                      title={option.numberOfAccountCode}
                      styles={{ ...PortfolioProductTilte }}
                    />
                  </Box>
                  <Box sx={PortfolioAccountContainer}>
                    <PageTitle
                      title={option.PrincipalatRisk}
                      styles={{ ...PortfolioProduct }}
                    />
                    <PageTitle
                      title={option.PrincipalatRiskNumber}
                      styles={{ ...PortfolioProductTilte }}
                    />
                  </Box>
                  <Box sx={PortfolioAccountContainer}>
                    <PageTitle
                      title={option.LoanBalance}
                      styles={{ ...PortfolioProduct }}
                    />
                    <PageTitle
                      title={option.LoanBalanceNumber}
                      styles={{ ...PortfolioProductTilte }}
                    />
                  </Box>
                </Box>
              </Box>
              <Link href={link}>
                <TableSingleAction actionName="View" />
              </Link>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
