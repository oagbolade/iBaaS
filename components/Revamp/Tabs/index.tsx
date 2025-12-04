import React from 'react';
import { Box, Tabs as TabComponent, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import colors from '@/assets/colors';

interface StyledTabProps {
  label: string;
  value: number;
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value?: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => {
  return (
    <TabComponent
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />
      }}
    />
  );
})({
  color: `${colors.neutral600}`,
  '& .Mui-selected': {
    color: `${colors.gray800}`
  }
});

const StyledTab = styled((props: StyledTabProps) => {
  return <Tab disableRipple {...props} />;
})(() => {
  return {
    fontWeight: 600,
    lineHeight: '24px',
    color: `${colors.neutral600}`,
    '& .Mui-selected': {
      color: `${colors.gray800}`
    }
  };
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box mt={{ mobile: 0, desktop: 2 }}>{children}</Box>}
    </div>
  );
}

type Props = {
  tabTitle: Array<string>;
  pageMenu: Array<React.JSX.Element>;
  customStyle?: object;
};

export const Tabs = ({ tabTitle, pageMenu, customStyle }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '360px',
          borderBottom: 1,
          borderColor: 'divider',
          ...customStyle
        }}
      >
        <StyledTabs
          sx={{ fontSize: { mobile: '10px', desktop: '16px' } }}
          value={value}
          onChange={handleChange}
        >
          {tabTitle.map((title: string, index: number) => {
            return <StyledTab key={index} label={title} value={index} />;
          })}
        </StyledTabs>
      </Box>
      {pageMenu.map((page, index) => {
        return (
          <CustomTabPanel key={index} value={value} index={index}>
            {page}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};
