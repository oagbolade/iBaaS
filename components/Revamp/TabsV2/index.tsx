import React, { useEffect, useState } from 'react';
import { Box, Tabs as TabComponent, Tab } from '@mui/material';
import { styled as muiStyledComponent } from '@mui/material/styles';
import styled from 'styled-components';
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

const TabsWrapper = styled.div`
  .MuiTabs-flexContainer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
`;

const StyledTabs = muiStyledComponent((props: StyledTabsProps) => {
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

const StyledTab = muiStyledComponent((props: StyledTabProps) => {
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
  values: number;
  tabTitle: Array<string>;
  pageMenu: Array<React.JSX.Element>;
  customStyle?: object;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  storageKey?: string;
};

export const TabsV2 = ({
  tabTitle,
  pageMenu,
  customStyle,
  handleChange,
  values,
  storageKey
}: Props) => {
  const [activeTab, setActiveTab] = useState(values);

  useEffect(() => {
    // Retrieve the active tab from localStorage when the component mounts
    const storedTab = localStorage.getItem(storageKey || '');
    if (storedTab !== null) {
      const parsedTab = parseInt(storedTab, 10);
      if (!Number.isNaN(parsedTab) && parsedTab !== activeTab) {
        setActiveTab(parsedTab);
        handleChange({} as React.SyntheticEvent, parsedTab);
      }
    }
  }, []);

  useEffect(() => {
    if (storageKey) {
      // Save the active tab to localStorage whenever it changes
      localStorage.setItem(storageKey || '', activeTab.toString());
    }
  }, [activeTab, storageKey]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    handleChange(event, newValue);
  };

  return (
    <TabsWrapper>
      <Box
        sx={{
          width: '100%',
          borderBottom: 1,
          borderColor: 'divider',
          ...customStyle
        }}
      >
        <StyledTabs
          sx={{
            fontSize: { mobile: '10px', desktop: '16px' }
          }}
          value={activeTab}
          onChange={handleTabChange}
        >
          {tabTitle.map((title: string, index: number) => {
            return (
              <StyledTab
                key={index}
                label={title}
                value={index}
                sx={{
                  padding: '0px, 0px, 0px, 24px',
                  width: { mobile: '320px', tablet: '100%' },
                  height: { mobile: '32px', tablet: '48px' },
                  marginTop: '20px',
                  color: `${colors.gray800}`,
                  fontSize: { mobile: '12px', tablet: '16px' }
                }}
              />
            );
          })}
        </StyledTabs>
      </Box>
      {pageMenu.map((page, index) => {
        return (
          <CustomTabPanel key={index} value={activeTab} index={index}>
            {page}
          </CustomTabPanel>
        );
      })}
    </TabsWrapper>
  );
};
