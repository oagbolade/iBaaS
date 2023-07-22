import React from "react";
import Typography from "@mui/material/Typography";
import colors from "@/assets/colors";

type Props = {
  buttonTitle: string;
  icon: any;
};

export default function SideBarPrimaryButton({ buttonTitle, icon }: Props) {
  return (
    <>
      {icon}
      <Typography
        sx={{
          backgroundColor: `${colors.lightGrey}`,
          fontFamily: "Averta Regular",
        }}
        variant="subtitle1"
        ml={2}
        mt={0.2}
      >
        {buttonTitle}
      </Typography>
    </>
  );
}
