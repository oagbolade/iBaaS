'use client';

import React from 'react';
import { Box } from '@mui/material';
import {
    ViewAccountContainer,
    ViewStyle,
    ViewAccountTitle,
    ViewTitle
} from './style';
import { PageTitle } from '@/components/Typography';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ILoanMaturityReport } from '@/api/ResponseTypes/reports';

export const ViewMaturityLoan: React.FC<{ detail: ILoanMaturityReport }> = ({ detail }) => {
    const renderDetailItem = (key: string, value: any) => (
        <Box key={key}>
            <Box sx={ViewStyle}>
                <PageTitle title={key} styles={ViewAccountTitle} />
                <PageTitle 
                    title={String(value)} 
                    styles={ViewTitle}
                />
            </Box>
        </Box>
    );

    return (
        <Box>
            <TopActionsArea customStyle={{ padding: '24px' }} />
            <Box sx={ViewAccountContainer}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        rowGap: '40px',
                        width: '100%'
                    }}
                >
                    {Object.entries(detail).map(([key, value]) => 
                        renderDetailItem(key, value)
                    )}
                </Box>
            </Box>
        </Box>
    );
};
