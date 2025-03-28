import Image from 'next/image';
import React from 'react';
import Interswitch from '@/public/interswitchng.svg';
import DigivantSVG from '@/public/digivantLogo.svg';
import DIGITVANT from '@/public/download.png';

export const InterSwitchImage = () => {
  return (
    <Image
      alt="Interswitch Logo"
      src={Interswitch}
      priority
      style={{
        width: '147px',
        height: '36px',
        flexShrink: 0
      }}
    />
  );
};

export const DIGITVANTImage = () => {
  return (
    <Image
      alt="DIGITVANT Logo"
      src={DIGITVANT}
      priority
      style={{
        width: '120px',
        height: '38px',
        flexShrink: 0,
        position: 'relative'
      }}
    />
  );
};

export const DIGITVANTImageSVG = () => {
  return (
    <Image
      alt="DIGITVANT Logo"
      src={DigivantSVG}
      priority
      style={{
        width: '120px',
        height: '38px',
        flexShrink: 0,
        position: 'relative'
      }}
    />
  );
};
