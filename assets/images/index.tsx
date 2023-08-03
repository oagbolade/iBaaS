import Image from 'next/image';
import loginBanner from '@/assets/images/loginBanner.png';

type Props = {
  width?: string;
  height?: string;
};

export const LoginBanner = ({ width, height }: Props) => {
  return (
    <Image
      alt="Login Banner"
      src={loginBanner}
      style={{
        width,
        height,
        flexShrink: 0,
      }}
    ></Image>
  );
};

LoginBanner.defaultProps = {
  width: '686px',
  height: '900px',
};
