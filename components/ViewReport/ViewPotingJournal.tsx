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
import { IPostingJournal } from '@/api/ResponseTypes/reports';

interface PostingJournalItemProps {
    label: string;
    value: string;
}

const PostingJournalItem: React.FC<PostingJournalItemProps> = ({ label, value }) => (
    <Box>
        <Box sx={ViewStyle}>
            <PageTitle title={label} styles={ViewAccountTitle} />
            <PageTitle title={String(value)} styles={ViewTitle} />
        </Box>
    </Box>
);

export const ViewPostingJournal: React.FC<{ detail: IPostingJournal }> = ({ detail }) => {
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
                    {Object.entries(detail).map(([key, value]) => (
                        <PostingJournalItem
                            key={key}
                            label={key}
                            value={value}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
