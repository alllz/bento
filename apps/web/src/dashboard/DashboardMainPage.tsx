import { Wallet } from '@bento/common';
import { OpenSeaAsset } from '@bento/core';
import styled from '@emotion/styled';
import { User } from '@supabase/supabase-js';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { createHmac } from 'crypto';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { PageContainer } from '@/components/PageContainer';
import { useSession } from '@/hooks/useSession';
import { getServerSupabase } from '@/utils/ServerSupabase';
import { formatUsername } from '@/utils/format';

import { UserProfile } from '@/profile/types/UserProfile';
import { ErrorResponse } from '@/profile/types/api';
import { Analytics, Supabase, axiosWithCredentials, toast } from '@/utils';

import { DetailModalParams } from './components/DetailModal';
import { KlaytnNFTAsset } from './hooks/useKlaytnNFTs';

const DynamicDashboardMain = dynamic(() => import('./DashboardMain'));
const DynmaicAddWalletModal = dynamic(
  () => import('./components/AddWalletModal'),
);
const DynamicDetailModal = dynamic(() => import('./components/DetailModal'));
const DynamicNFTDetailModal = dynamic(() =>
  import('@/profile/instance/sections/NFTDetailModal').then(
    (module) => module.NFTDetailModal,
  ),
);

type Props =
  | {
      type: 'MY_PROFILE';
      imageToken: string;
      profile: UserProfile;
    }
  | {
      type: 'USER_PROFILE';
      imageToken: string;
      profile: UserProfile;
    };

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const getKoreanTimestring = (timestamp: string) => {
  const curr = new Date(timestamp);
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  return format(new Date(utc + KR_TIME_DIFF), 'yyyy-MM-dd HH:mm:ss');
};

const getImageTokenFromUserId = (userId: string) => {
  const hmac = createHmac('sha256', 'my_secret');
  hmac.update(JSON.stringify({ user_id: userId }));
  return hmac.digest('hex');
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const notifySlack = async (user: User, profile: UserProfile) => {
  if (!process.env.SLACK_NEW_PROFILE_WEBHOOK) {
    // disabled
    return;
  }

  const provider = user.app_metadata.provider;
  await axios
    .post(process.env.SLACK_NEW_PROFILE_WEBHOOK, {
      provider: capitalize(provider || 'none'),
      social_url: !provider
        ? 'No social link available'
        : provider === 'twitter'
        ? `https://twitter.com/${user.user_metadata.user_name}`
        : `https://github.com/${user.user_metadata.user_name}`,
      user_id: user.id,
      profile_url: `https://www.bento.finance/u/${profile.username}`,
      joined_at: getKoreanTimestring(user.created_at),
    })
    .catch((e) => {
      console.error('[Slack] Failed to send webhook', e);
    });
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const Supabase = getServerSupabase();
  const accessToken: string =
    (getCookie('supabase_auth_token', {
      req: context.req,
      res: context.res,
    }) as string) || '';
  const username = context.query.username as string | undefined;

  if (username && username.length >= 36) {
    const userId = username;
    const [profileQueryRes, userQueryRes] = await Promise.all([
      Supabase.from('profile').select('*').eq('user_id', userId.toLowerCase()),
      Supabase.auth.api.getUserById(userId),
    ]);
    const profiles: UserProfile[] = profileQueryRes.data ?? [];
    const profile = profiles[0];

    if (!profile) {
      if (!userQueryRes.data) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      const user = userQueryRes.data;

      const displayName =
        user.identities?.[0]?.identity_data?.user_name ||
        user.user_metadata.user_name ||
        '';

      const data = await Supabase.from('profile').upsert({
        user_id: userId,
        username: userId,
        display_name: displayName,
        bio: '',
      });

      if (!!data.error) {
        console.log({ error: data.error });
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      const newProfile = {
        user_id: userId,
        username: userId,
        display_name: displayName,
        bio: '',
        images: [],
        verified: false,
        tabs: [],
        links: [],
      };
      try {
        await notifySlack(user, newProfile);
      } catch (error) {
        console.error(error);
      }

      return {
        props: {
          type: 'USER_PROFILE',
          profile: newProfile,
          imageToken: getImageTokenFromUserId(userId),
          ...(await serverSideTranslations(context.locale || 'en', [
            'common',
            'dashboard',
          ])),
        },
      };
    }
    return {
      props: {
        type: 'USER_PROFILE',
        profile,
        imageToken: getImageTokenFromUserId(userId),
        ...(await serverSideTranslations(context.locale || 'en', [
          'common',
          'dashboard',
        ])),
      },
    };
  }

  // username should not be empty
  if (!username) {
    return {
      redirect: {
        permanent: false,
        destination:
          (context.locale === 'en' ? '' : `/${context.locale}`) +
          `/profile/intro`,
      },
    };
  }

  let profile: UserProfile | null = null;
  const [usernameQueryRes, { user: userFromCookie }] = await Promise.all([
    Supabase.from('profile') //
      .select('*')
      .eq('username', username.toLowerCase()),
    Supabase.auth.api.getUser(accessToken),
  ]);
  const profiles: UserProfile[] = usernameQueryRes.data ?? [];
  if (profiles.length > 0) {
    profile = profiles[0];
  }

  if (!!profile) {
    return {
      props: {
        type:
          userFromCookie?.id === profile.user_id //
            ? 'MY_PROFILE'
            : 'USER_PROFILE',
        profile,
        imageToken: getImageTokenFromUserId(profile.user_id),
        ...(await serverSideTranslations(context.locale || 'en', [
          'common',
          'dashboard',
        ])),
      },
    };
  }
  return { notFound: true };
};

const fetchWallets = async (userId: string): Promise<Wallet[]> => {
  const walletQuery = await Supabase.from('wallets')
    .select('*')
    .eq('user_id', userId);
  return walletQuery.data ?? [];
};

const DashboardPage = ({
  profile: preloadedProfile,
  imageToken,
  ...props
}: Props) => {
  const router = useRouter();
  const { session } = useSession();
  const [profile, setProfile] = useState<UserProfile>(preloadedProfile);
  const revalidateProfile = useCallback(async () => {
    const userId = preloadedProfile?.user_id;
    if (!userId) {
      return;
    }
    const res = await Supabase.from('profile') //
      .select('*')
      .eq('user_id', userId);
    if (res.error) {
      console.error(res.error);
      return;
    }
    const profiles: UserProfile[] = res.data ?? [];

    if (profiles.length > 0) {
      const firstProfile = profiles[0];
      setProfile(firstProfile);
    }
  }, [preloadedProfile]);

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const revalidateWallets = useCallback(async () => {
    try {
      const wallets = await fetchWallets(profile.user_id);
      setWallets(wallets);
    } catch {
      setWallets([]);
    }
    return wallets;
  }, [profile.user_id]);

  useEffect(() => {
    revalidateWallets();
  }, [revalidateWallets]);

  const [isAddWalletModalVisible, setAddWalletModalVisible] =
    useState<boolean>(false);
  const [isDetailModalVisible, setDetailModalVisible] =
    useState<boolean>(false);
  const [detailModalParams, setDetailModalParams] = useState<DetailModalParams>(
    {},
  );

  const hasWallet = !!session && wallets.length > 0;

  const hasLoggedTabViewEvent = useRef<boolean>(false);
  useEffect(() => {
    if (!hasLoggedTabViewEvent.current) {
      Analytics.logEvent('view_dashboard_tab', undefined);
    }
    hasLoggedTabViewEvent.current = true;
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    } else {
      Analytics.logEvent('view_dashboard_main', {
        user_id: profile.user_id,
        username: profile.username,
      });
    }
  }, [hasWallet, profile?.user_id, profile?.username]);

  const [isMyProfile, setMyProfile] = useState<boolean>(
    props.type === 'MY_PROFILE',
  );
  useEffect(() => {
    setMyProfile(session?.user?.id === profile.user_id);
  }, [JSON.stringify(session)]);

  const [title, description, ogImageURL] = useMemo(() => {
    let _title: string = '';
    let _description: string = '';

    const formattedUsername = formatUsername(profile.username);
    const displayName = profile.display_name;

    if (!!displayName) {
      _title = `${displayName} (${formattedUsername}) | Bento`;
    } else {
      _title = `${formattedUsername} | Bento`;
    }

    _description = profile.bio ?? '';

    return [
      _title,
      _description,
      `https://dev-server.bento.finance/api/images/og/u/${formatUsername(
        profile.username,
        '',
      )}`,
    ];
  }, [profile]);

  const [selectedNFT, setSelectedNFT] = useState<
    OpenSeaAsset | KlaytnNFTAsset | null
  >(null);

  const onClickSetAsProfile = useCallback(
    async (assetImage: string) => {
      try {
        await axiosWithCredentials.post(`/api/profile`, {
          username: profile?.username.toLowerCase(),
          display_name: profile?.display_name,
          images: [assetImage],
        });
        revalidateProfile?.();

        setTimeout(() => {
          toast({
            type: 'success',
            title: 'Changes Saved',
          });

          document.body.scrollIntoView({
            behavior: 'smooth',
          });
        });
      } catch (e) {
        if (e instanceof AxiosError) {
          const errorResponse = e.response?.data as ErrorResponse;
          if (errorResponse?.code === 'USERNAME_UNUSABLE') {
            toast({
              type: 'error',
              title: errorResponse.message,
              description: 'Please choose another username',
            });
          } else if (errorResponse?.code === 'VALUE_REQUIRED') {
            toast({
              type: 'error',
              title: errorResponse.message,
            });
          } else {
            toast({
              type: 'error',
              title: 'Server Error',
              description: errorResponse?.message || 'Something went wrong',
            });
          }
        }
      }
    },
    [profile, revalidateProfile],
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="title" name="title" content={title} />
        <meta key="og:title" property="og:title" content={title} />
        <meta key="twitter:title" name="twitter:title" content={title} />

        <link
          key="canonical"
          rel="canonical"
          href={`https://bento.finance${router.asPath.split('?')[0]}`}
        />

        {description.length > 0 && (
          <>
            <meta key="description" name="description" content={description} />
            <meta
              key="og:description"
              property="og:description"
              content={description}
            />
            <meta
              key="twitter:description"
              name="twitter:description"
              content={description}
            />
          </>
        )}

        {ogImageURL && (
          <>
            <meta key="og:image" property="og:image" content={ogImageURL} />
            <meta
              key="twitter:image"
              property="twitter:image"
              content={ogImageURL}
            />
          </>
        )}
      </Head>

      <Black />
      <PageContainer style={{ paddingTop: 0 }}>
        <DynamicDashboardMain
          isMyProfile={isMyProfile}
          wallets={wallets}
          profile={profile}
          imageToken={imageToken}
          revalidateWallets={revalidateWallets}
          setAddWalletModalVisible={setAddWalletModalVisible}
          setDetailModalVisible={setDetailModalVisible}
          setDetailModalParams={setDetailModalParams}
          selectedNFT={selectedNFT}
          setSelectedNFT={setSelectedNFT}
        />

        <DynmaicAddWalletModal
          visible={isAddWalletModalVisible}
          onDismiss={() => setAddWalletModalVisible((prev) => !prev)}
          revalidateWallets={revalidateWallets}
        />
        <DynamicDetailModal
          visible={isDetailModalVisible}
          onDismiss={() => {
            setDetailModalVisible((prev) => !prev);
            setDetailModalParams({});
          }}
          // selectedNFT={selectedNFT}
          setSelectedNFT={setSelectedNFT}
          {...detailModalParams}
        />

        <DynamicNFTDetailModal
          asset={selectedNFT}
          visible={!!selectedNFT}
          onDismiss={() => setSelectedNFT(null)}
          isMyProfile={isMyProfile}
          onClickSetAsProfile={(assetImage) => {
            if (!profile || !selectedNFT) {
              return;
            }
            Analytics.logEvent('set_nft_as_profile', {
              user_id: profile.user_id ?? '',
              username: profile.username ?? '',
              is_my_profile: isMyProfile,
              token_network:
                'network' in selectedNFT && selectedNFT.network === 'klaytn'
                  ? 'klaytn'
                  : 'ethereum',
              token_contract: selectedNFT.asset_contract.address,
              token_id: selectedNFT.token_id,
              medium: 'dashboard_main',
            });
            onClickSetAsProfile(assetImage);
          }}
        />
      </PageContainer>
    </>
  );
};

export default DashboardPage;

const Black = styled.div`
  width: 100%;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
`;
