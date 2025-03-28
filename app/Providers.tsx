import React from 'react';
import NavBarContextProvider from './NavBarContext';
import SideBarContextProvider from './SideBarContext';
import MuiSnackbarContextProvider from '@/context/MuiSnackbarContext';
import ToastMessageContextProvider from '@/context/ToastMessageContext';
import CustomerCreationContextProvider from '@/context/CustomerCreationContext';
import RequestModuleContextProvider from '@/context/RequestModuleContext';
import ReportModuleContextProvider from '@/context/ReportModuleContext';
import DownloadReportContextProvider from '@/context/DownloadReportContext';
import TrackRecentlyVisitedModulesContextProvider from '@/context/TrackRecentlyVisitedModulesContext';
import SetupAndCompanyModuleContextProvider from '@/context/SetupAndCustomerContext';
import DateRangePickerContextProvider from '@/context/DateRangePickerContext';

export const ContextProviders = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <TrackRecentlyVisitedModulesContextProvider>
    <ToastMessageContextProvider>
      <MuiSnackbarContextProvider>
        <SideBarContextProvider>
          <NavBarContextProvider>
            <CustomerCreationContextProvider>
              <RequestModuleContextProvider>
                <DownloadReportContextProvider>
                  <ReportModuleContextProvider>
                    <SetupAndCompanyModuleContextProvider>
                      <DateRangePickerContextProvider>
                        {children}
                      </DateRangePickerContextProvider>
                    </SetupAndCompanyModuleContextProvider>
                  </ReportModuleContextProvider>
                </DownloadReportContextProvider>
              </RequestModuleContextProvider>
            </CustomerCreationContextProvider>
          </NavBarContextProvider>
        </SideBarContextProvider>
      </MuiSnackbarContextProvider>
    </ToastMessageContextProvider>
  </TrackRecentlyVisitedModulesContextProvider>
);
