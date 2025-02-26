import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Icon as Iconify } from '@iconify/react';
import { deleteCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Icon, NoSSR, Portal } from '@/components/system';
import { useSession } from '@/hooks/useSession';
import { useSignOut } from '@/hooks/useSignOut';
import { useWindowSize } from '@/hooks/useWindowSize';

import { MinimalButton } from '@/dashboard/components/MinimalButton';
import { Colors } from '@/styles';
import { Analytics } from '@/utils';

const Breakpoints = {
  Mobile: 512,
  Tablet: 768,
  Laptop: 1340,
  Desktop: 1440,
};

const onMobile = `@media (max-width: ${Breakpoints.Mobile}px)`;
const onTablet = `@media (max-width: ${Breakpoints.Tablet}px)`;

const NAVIGATION_ITEMS = [
  {
    title: 'Dashboard',
    href: '/home',
    icon: 'ic:round-space-dashboard',
  },
  {
    title: 'Community',
    href: '/community',
    icon: 'codicon:heart-filled',
  },
];

type LanguageSelectorProps = {
  currentLanguage: 'en' | 'ko' | string;
  onChangeLocale: () => void;
  isDesktop?: boolean;
};
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onChangeLocale,
  isDesktop: desktop,
}) => (
  <LanguageSelectorContainer desktop={desktop}>
    <button
      className={currentLanguage === 'en' ? 'selected' : ''}
      onClick={onChangeLocale}
    >
      <span>EN</span>
    </button>
    <button
      className={currentLanguage === 'ko' ? 'selected' : ''}
      onClick={onChangeLocale}
    >
      <span>KO</span>
    </button>
  </LanguageSelectorContainer>
);

export const NavigationBar = () => {
  const router = useRouter();
  const currentPath = useMemo(() => {
    if (router.route.startsWith('/u/')) {
      // e.g. /profile/intro
      return '/home';
    }
    return router.route;
  }, [router]);

  const { session } = useSession();
  const { signOut } = useSignOut();

  const onClickLogout = useCallback(async () => {
    await Analytics.logEvent('click_logout', {
      medium: 'gnb',
    });
    await signOut();
  }, [signOut]);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { t, i18n } = useTranslation('common');
  const currentLanguage = i18n.resolvedLanguage || i18n.language || 'en';

  const onChangeLocale = useCallback(
    () =>
      router.push(router.asPath, router.asPath, {
        locale: currentLanguage === 'en' ? 'ko' : 'en',
      }),
    [i18n, currentLanguage],
  );

  const { width: windowWidth } = useWindowSize();
  useEffect(() => {
    if (isMobileMenuOpen && windowWidth > 680) {
      setMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen, windowWidth]);

  return (
    <Wrapper>
      <Container>
        <Link href="/">
          <div>
            <HiddenTitle>Bento</HiddenTitle>
            <LogoWrapper>
              <LogoImage src="/assets/illusts/bento-logo-with-blur.png" />
            </LogoWrapper>
          </div>
        </Link>

        <NoSSR>
          <NavigationList>
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationItem
                key={`${item.title}-${item.href}`}
                active={currentPath === item.href}
              >
                <Link href={item.href}>
                  <Center style={{ cursor: 'pointer' }}>
                    <Iconify icon={item.icon} style={{ fontSize: 20 }} />
                    <span className="title">{t(item.title)}</span>
                  </Center>
                </Link>
              </NavigationItem>
            ))}
          </NavigationList>
        </NoSSR>

        <RightContent>
          <NoSSR>
            {!session && (
              <LoginButton
                onClick={() => {
                  deleteCookie('supabase_auth_token', {
                    path: '/',
                  });
                  setTimeout(() => {
                    router.push('/home?login=open');
                  });
                }}
              >
                {t('Log In')}
              </LoginButton>
            )}
            {!!session && (
              <LogoutButton className="sys" onClick={onClickLogout}>
                {t('Logout')}
              </LogoutButton>
            )}
          </NoSSR>

          <LanguageSelector
            currentLanguage={currentLanguage}
            onChangeLocale={onChangeLocale}
            isDesktop
          />
        </RightContent>

        <MobileMenuButton onClick={() => setMobileMenuOpen((prev) => !prev)}>
          <Icon
            size={30}
            icon={!isMobileMenuOpen ? 'ic-mobile-menu' : 'ic-mobile-close'}
            color="white"
          />
        </MobileMenuButton>
      </Container>

      <Portal id="mobile-menu">
        <MobileMenuContainer
          style={isMobileMenuOpen ? { height: '100%' } : { height: 0 }}
        >
          <AnimatePresence>
            {isMobileMenuOpen && (
              <MobileMenuContent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {NAVIGATION_ITEMS.map((item) => (
                  <MobileMenuItem
                    key={`${item.title}-${item.href}`}
                    style={{
                      color: currentPath === item.href ? '#ff375c' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Center>
                        <Iconify icon={item.icon} />
                        <span className="title">{t(item.title)}</span>
                      </Center>
                    </Link>
                  </MobileMenuItem>
                ))}

                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onChangeLocale={onChangeLocale}
                />
              </MobileMenuContent>
            )}
          </AnimatePresence>
        </MobileMenuContainer>
      </Portal>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 64px;
  padding: 0 20px;

  border-bottom: 0.4pt solid #1c1c1c;
  background-color: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);

  display: flex;
  justify-content: center;
  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;

  ${onMobile} {
    padding: 0 16px;
  }

  & * {
    transition: all 0.2s ease-in-out;
  }
`;
const Container = styled.div`
  max-width: 1328px;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Center = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const HiddenTitle = styled.span`
  display: none;
`;
const LogoWrapper = styled.div`
  width: 156px;
  height: 78px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${onTablet} {
    margin-left: -20px;
  }
`;

const BLUR_SIZE = 31.2;
const LogoImage = styled.img`
  max-width: unset;
  margin: ${-BLUR_SIZE}px;
  width: ${156 + BLUR_SIZE * 2}px;
  height: ${78 + BLUR_SIZE * 2}px;
  transform: scale(1.3);
  user-select: none;
`;

const NavigationList = styled.ul`
  display: flex;
  gap: 8px;

  @media (max-width: 680px) {
    display: none;
  }
`;

type NavigationItemProps = {
  active?: boolean;
};
const NavigationItem = styled.li<NavigationItemProps>`
  height: 64px;
  position: relative;
  color: rgba(255, 255, 255, 0.45);

  * {
    transition: color 0.05s ease;
  }

  & > a {
    padding: 0 8px;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    span.title {
      font-size: 14px;
      font-weight: bold;
      line-height: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    height: 0;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    background-color: #fe214a;
    width: 100%;

    transition: height 0.2s ease-in-out;
  }

  &:not(:last-of-type) {
    margin-right: 12px;
  }

  ${({ active }) =>
    active &&
    css`
      color: white;

      &::after {
        height: 4px;
      }
    `};
`;

const RightContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 32px;

  position: relative;
  z-index: 10;

  @media (max-width: 680px) {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const LogoutButton = styled.button`
  margin-right: 16px;
  height: 32px;

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${Colors.gray000};

  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    color: ${Colors.gray200};
  }
`;
const LoginButton = styled(MinimalButton)`
  margin: -32px 0;
  padding: 12px 0;
  width: 102px;
`;

const LanguageSelectorContainer = styled.div<{ desktop?: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0;

  & > button {
    height: 100%;
    padding: 0 6px;
    font-weight: 900;
    font-size: 20px;
    line-height: 120%;
    text-align: center;
    letter-spacing: 0.01em;
    user-select: none;

    & > span {
      color: ${Colors.gray500};
    }

    &.selected > span {
      color: #ffcff2;
      background: linear-gradient(
          to right,
          #ffffff 5%,
          #e4f7ff 15%,
          #cef0ff 41%,
          #b4c4ff 48%,
          #ffcff2 54%,
          #ffffff 62%,
          #d2d2d2 81%,
          #ffd7d7 92%,
          #d5d5d5 100%
        ),
        #ffcff2;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  ${({ desktop }) =>
    desktop
      ? css`
          @media (max-width: 680px) {
            display: none;
          }
        `
      : css`
          height: fit-content;
          margin: auto -8px 80px;
          transform: scale(1.5);
          transform-origin: top left;
        `};
`;

const MobileMenuButton = styled.button`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  border: 2px solid white;
  border-radius: 2px;

  display: none;

  @media (max-width: 680px) {
    display: flex;
  }
`;

const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
  background-color: black;
  transition: all 0.5s ease-in-out;
`;
const MobileMenuContent = styled(motion.ul)`
  margin: 0 auto;
  padding: ${64 + 16}px 20px 0;
  max-width: 1328px;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const MobileMenuItem = styled.li`
  padding: 16px 0;
  font-size: 24px;

  span.title {
    line-height: 100%;
    font-weight: 500;
  }
`;
