import React from 'react';
import Image from 'next/image';
import loginBanner from '@/assets/images/loginBanner.png';
import Box from '@mui/material/Box';

type Props = {
  width?: string;
  height?: string;
};

export const LoginBanner = ({ width, height }: Props) => {
  return (
    <Box
      style={{
        position: 'relative',
        width,
        height,
        flexShrink: 0,
      }}
    >
      <Image
        alt="Login Banner"
        src={loginBanner}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity (last value) to control the darkness
        }}
      />
    </Box>
  );
};

LoginBanner.defaultProps = {
  width: '686px',
  height: '900px',
};
