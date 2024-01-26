'use client';
import React, { useContext } from 'react';
import { useBusinessSetup } from '@/utils/useBusinessSetup';
import { useRemoveSideBar } from '@/utils/useRemoveSidebar';
import { SideBarContext } from '@/app/SideBarContext';

type Props = {
  children: React.ReactNode;
};

export const RenderChildren = ({ children }: Props) => {
  const { isBusinessSetupPage } = useBusinessSetup();
  const { marginLeft, width } = useRemoveSideBar();
  const { setOpenMenu } = useContext(SideBarContext);

  const handleClick = () => setOpenMenu(false);
  const onKeyPressHandler = () => {};

  return isBusinessSetupPage ? (
    children
  ) : (
    <div
      tabIndex={0}
      role="button"
      onKeyUp={onKeyPressHandler}
      onClick={handleClick}
      style={{ marginLeft, width }}
    >
      {children}
    </div>
  );
};
