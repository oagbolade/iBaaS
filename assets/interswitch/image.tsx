import Image from 'next/image';
import React from 'react';
import Interswitch from '@/public/interswitchng.svg';

const InterSwitchImage = () => {
  return (
    <Image
      alt=""
      src={Interswitch}
      style={{
        width: '147px',
        height: '36px',
        flexShrink: 0,
      }}
    ></Image>
  );
};
export default InterSwitchImage;
