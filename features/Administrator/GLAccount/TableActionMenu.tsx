import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { sanitize } from 'dompurify';
import { TableSingleAction } from '@/components/Revamp/TableV2';

type Props = {
  glNumber: string;
};

export const TableActionMenu = ({ glNumber }: Props) => {
  return (
    <Box>
      <Link
        href={`/admin/gl-account/create/?glNumber=${sanitize(glNumber)}&isEditing=true`}
      >
        <TableSingleAction actionName="Edit" />
      </Link>
    </Box>
  );
};
