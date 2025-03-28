import Image from 'next/image';
import React from 'react';
import whiteInterswitchLogo from '@/public/whiteInterswitchLogo.svg';

const WhiteInterswitchLogo = () => {
  return (
    <Image
      alt=""
      src={whiteInterswitchLogo}
      priority
      style={{
        width: '147px',
        height: '36px',
        marginLeft: '-20px',
        flexShrink: 0
      }}
    />
  );
};

export default WhiteInterswitchLogo;
