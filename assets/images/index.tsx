import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import cancelButton from '@/public/cancelButton.png'
import loginBanner from '@/public/loginBanner.svg';
import buttonLoader from '@/public/buttonLoader.svg';

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
        flexShrink: 0
      }}
    >
      <Image
        alt="Login Banner"
        src={loginBanner}
        layout="fill"
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)' // Adjust the opacity (last value) to control the darkness
        }}
      />
    </Box>
  );
};

export const ButtonLoader = () => {
  return (
    <Image
      alt="Loading..."
      src={buttonLoader}
      style={{
        width: '50px',
        height: '36px',
        flexShrink: 0
      }}
    />
  );
};
export const CancelButton = () => {
  return (
    <Image
      alt="Loading..."
      src={cancelButton}
      style={{
        width: '20px',
        height: '20px',
      }}
    />
  );
};
