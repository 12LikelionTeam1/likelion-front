import { useMemo } from 'react';
import style from './styles/nanum.text.module.css';

type Props = {
  color?: 'black' | 'red';
  size?: 'f12' | 'f14' | 'f16' | 'f18' | 'f20';
} & {
  readonly children: React.ReactNode;
};

const NanumText = ({ color = 'black', size = 'f16', children }: Props) => {
  const textSize = useMemo(() => {
    switch (size) {
      case 'f12':
        return 'text-xs';
      case 'f14':
        return 'text-xm';
      case 'f16':
        return 'text-base';
      case 'f18':
        return 'text-lg';
      case 'f20':
        return 'text-xl';
      default:
        return 'text-base';
    }
  }, [size]);

  return color == 'black' ? (
    <a className={`${style.text} text-black ${textSize}`}>{children}</a>
  ) : (
    <a className={`${style.text} text-red ${textSize}`}>{children}</a>
  );
};

export default NanumText;
