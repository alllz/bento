import { GetServerSideProps } from 'next';
import DocumentHead from 'next/head';
import React, { useMemo } from 'react';

import { NoSSR } from '@/components/NoSSR';
import { PageContainer } from '@/components/PageContainer';
import { useSession } from '@/hooks/useSession';
import { FeatureFlags } from '@/utils/FeatureFlag';
import { Supabase } from '@/utils/Supabase';

import { FixedLoginNudge } from '../components/LoginNudge';
import { ProfileInstance } from '../components/ProfileInstance';
import { UserProfile } from '../types/UserProfile';
import { useProfile } from './hooks/useProfile';

type Props =
  | {
      type: 'MY_PROFILE';
    }
  | {
      type: 'USER_PROFILE';
      profile?: UserProfile | null;
    };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  if (!FeatureFlags.isProfileEnabled) {
    return { notFound: true };
  }
  const username = context.query.username as string | undefined;
  if (!username) {
    return { props: { type: 'MY_PROFILE' } };
  }

  let profile: UserProfile | null = null;
  const profileQuery = await Supabase.from('profile')
    .select('*')
    .eq('username', username);
  const profiles: UserProfile[] = profileQuery.data ?? [];

  if (profiles.length > 0) {
    profile = profiles[0];
  }

  if (!!profile) {
    return { props: { type: 'USER_PROFILE', profile } };
  }
  return { notFound: true };
};

const ProfileDetailPage = (props: Props) => {
  const { session } = useSession();

  const { profile, revaildateProfile } = useProfile(
    props.type === 'MY_PROFILE'
      ? { type: 'MY_PROFILE' }
      : {
          type: 'USER_PROFILE',
          username: props.profile?.username,
        },
  );

  const [title, description, images] = useMemo(() => {
    const username = profile?.display_name ?? profile?.username;
    return [
      !username ? 'Bento Profile' : `${username} - Bento`,
      profile?.bio ?? '',
      profile?.images || [],
    ];
  }, [profile]);

  return (
    <PageContainer>
      <DocumentHead>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />

        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        {images.length > 0 && (
          <>
            <meta property="og:image" content={images[0]} key="og:image" />
            <meta
              property="twitter:image"
              content={images[0]}
              key="twitter:image"
            />
          </>
        )}

        {/* <meta property="og:url" content={url} />
        <meta property="twitter:url" content={url} /> */}
      </DocumentHead>

      <div className="w-full max-w-xl mt-[64px] mx-auto">
        <NoSSR>
          <ProfileInstance
            profile={profile ?? undefined}
            revaildateProfile={revaildateProfile}
          />
        </NoSSR>
      </div>

      <FixedLoginNudge
        visible={!session && props.type === 'MY_PROFILE'}
        redirectTo="current"
      />
    </PageContainer>
  );
};

export default ProfileDetailPage;
