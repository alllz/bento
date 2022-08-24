import { GetServerSideProps } from 'next';
import DocumentHead from 'next/head';
import React, { useMemo } from 'react';

import { NoSSR } from '@/components/NoSSR';
import { PageContainer } from '@/components/PageContainer';
import { useSession } from '@/hooks/useSession';
import { FeatureFlags } from '@/utils/FeatureFlag';

import { FixedLoginNudge } from '../components/LoginNudge';
import { ProfileInstance } from '../components/ProfileInstance';
import { UserProfile } from '../types/UserProfile';
import { useProfile } from './hooks/useProfile';

const defaultProfile: UserProfile = {
  username: '',
  display_name: '',
  images: [],
  verified: false,
  bio: '',
  tabs: [],
  links: null,
};

export const getServerSideProps: GetServerSideProps = async () => {
  if (!FeatureFlags.isProfileEnabled) {
    return { notFound: true };
  }
  return { props: {} };
};

const ProfileDetailPage = () => {
  const [profile] = useProfile();

  const { session } = useSession();

  // FIXME: True for now
  const isMyProfile = true;

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

      <div className="w-full max-w-xl mx-auto">
        <NoSSR>
          <ProfileInstance
            profile={{
              ...(profile ?? defaultProfile),
              images:
                !!profile && !profile.images?.[0]
                  ? ['/assets/mockups/profile-default.png']
                  : null,
            }}
          />
        </NoSSR>
      </div>

      <FixedLoginNudge visible={!session && isMyProfile} />
    </PageContainer>
  );
};

export default ProfileDetailPage;
