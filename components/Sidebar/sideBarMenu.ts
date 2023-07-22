import { DashboardIcon, SetupIcon, AdminIcon } from "@/assets/svg";

export const sideBarMenu = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    subMenuItems: [
      { name: "Demand Deposit", link: "" },
      { name: "Loan Product", link: "" },
    ],
  },
  {
    name: "Setup",
    icon: SetupIcon,
    link: "",
    isMultiLevel: true,
    subMenuItems: [],
  },
  {
    name: "Admin",
    icon: AdminIcon,
    subMenuItems: [
      { name: "Manage Users", link: "" },
      { name: "Manage Roles", link: "" },
      { name: "Password Change", link: "" },
      { name: "Manage Posting Limit", link: "" },
      { name: "Manage GL Accounts", link: "" },
    ],
  },
  { name: "Customer Service", icon: AdminIcon, subMenuItems: [] },
];
