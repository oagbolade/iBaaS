import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';

import DOMPurify from 'dompurify';
import { TableSingleAction } from '@/components/Revamp/TableV2';

type Props = {
  roleId: string;
  branchId: string;
};

export const TableActionMenu = ({ roleId, branchId }: Props) => {
  return (
    <Box>
      <Link
        href={`/admin/posting-limit/create/?roleId=${DOMPurify.sanitize(roleId)}&branchId=${DOMPurify.sanitize(branchId)}&isEditing=true`}
      >
        <TableSingleAction actionName="Edit Limit" />
      </Link>
    </Box>
  );
};
