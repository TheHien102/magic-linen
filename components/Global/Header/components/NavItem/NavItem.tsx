import * as S from './NavItem.styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavItemProps {
  tab: {
    title: string;
    url: string;
    name?: string;
  };
}

export const NavItem = ({ tab: { title, url, name } }: NavItemProps) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <S.NavItem>
      <Link href={url}>
        {name === 'contact' ? (
          <S.NavContact>
            {title}
            <S.FlashIcon>
              <Image
                src='/img/flash.png'
                alt='Gaming Logo'
                width='1'
                height='1'
                layout='responsive'
              />
            </S.FlashIcon>
          </S.NavContact>
        ) : (
          <S.NavUrl className={`${currentPath === url ? 'active' : ''}`}>
            {title}
          </S.NavUrl>
        )}
      </Link>
    </S.NavItem>
  );
};
