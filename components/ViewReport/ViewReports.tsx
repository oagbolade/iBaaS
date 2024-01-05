'use client';
import React from 'react';
import { Box } from '@mui/material';
import {
  AccountContainer,
  ViewAccount,
  ViewAccountContainer,
  ViewContainer,
  ViewStyle,
  ViewAccountTitle,
  ViewTitle,
  ViewAccountStyle,
  AccountView,
} from './style';
import { PageTitle } from '@/components/Typography';

interface accountInfo {
  title: string;
  figure: string;
  name: string;
}

type Props = {
  accountIfo: accountInfo[];
};

export const ViewReports = ({ accountIfo }: Props) => {
  return (
    <Box>
      <Box sx={ViewAccountContainer}>
        {accountIfo.map((option) => (
          <Box sx={AccountContainer}>
            <Box sx={ViewAccount}>
              <Box sx={ViewContainer}>
                <Box sx={ViewStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                  </Box>
                  <Box>
                    <PageTitle title={option.name} styles={{ ...ViewTitle }} />
                  </Box>
                </Box>
                <Box sx={ViewAccountStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
                <Box sx={AccountView}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={ViewAccount}>
              <Box sx={ViewContainer}>
                <Box sx={ViewStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                  </Box>
                  <Box>
                    <PageTitle title={option.name} styles={{ ...ViewTitle }} />
                  </Box>
                </Box>
                <Box sx={ViewAccountStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
                <Box sx={AccountView}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={ViewAccount}>
              <Box sx={ViewContainer}>
                <Box sx={ViewStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                  </Box>
                  <Box>
                    <PageTitle title={option.name} styles={{ ...ViewTitle }} />
                  </Box>
                </Box>
                <Box sx={ViewAccountStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
                <Box sx={AccountView}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={ViewAccount}>
              <Box sx={ViewContainer}>
                <Box sx={ViewStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                  </Box>
                  <Box>
                    <PageTitle title={option.name} styles={{ ...ViewTitle }} />
                  </Box>
                </Box>
                <Box sx={ViewAccountStyle}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
                <Box sx={AccountView}>
                  <Box>
                    <PageTitle
                      title={option.title}
                      styles={{ ...ViewAccountTitle }}
                    />
                    <PageTitle
                      title={option.figure}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
