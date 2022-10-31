import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';

import illust from '@/assets/illusts/clonex-nft.png';

import { HiddenCardTitle } from '../components/HiddenCardTitle';

export const DisplayNFTsCard: React.FC = () => {
  const { i18n } = useTranslation('common');
  const currentLanguage = i18n.resolvedLanguage || i18n.language || 'en';

  return (
    <Card>
      <Content>
        {currentLanguage === 'en' && (
          <>
            <CardTitleEN />
            <HiddenCardTitle>Display Your NFTs</HiddenCardTitle>
          </>
        )}
        {currentLanguage === 'ko' && (
          <CardTitleKO>
            소유한 NFT <br />
            보여주기
          </CardTitleKO>
        )}

        <IllustContainer
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 2,
          }}
        >
          <AvatarNFT alt="" src={illust} sizes="512px" />
          <CollectionName />
        </IllustContainer>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  width: calc((100% - 84px) / 3);
  max-width: 400px;
  height: 100%;

  @media (max-width: 1400px) {
    width: calc((100% - 72px) / 3);
  }

  @media (max-width: 1280px) {
    width: calc((100% - 56px) / 3);
  }

  @media (max-width: 1110px) {
    width: 50%;
    max-width: unset;
    height: 400px;
  }

  @media (max-width: 735px) {
    width: 100%;
    margin: 0 auto;
    max-width: 500px;
  }

  background: linear-gradient(166.78deg, #91a5f5 5.04%, #a1f1fd 90.49%);
  border-radius: 48px;
  position: relative;
  overflow: hidden;
  z-index: 0;

  filter: saturate(120%);

  &::before,
  &::after,
  & > div {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 48px;
  }

  &::before {
    z-index: 1;
    background: rgba(6, 32, 49, 0.56);
    backdrop-filter: blur(45.5px);
  }

  &::after {
    z-index: 2;
    background-image: url('/assets/landing/noise.png');
    mix-blend-mode: overlay;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
`;
const _CardTitleEN: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="270"
    height="113"
    viewBox="0 0 270 113"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_279_54)">
      <path
        d="M28.08 10.16C31.632 10.16 34.736 10.88 37.392 12.32C40.08 13.728 42.144 15.712 43.584 18.272C45.024 20.832 45.744 23.76 45.744 27.056C45.744 30.32 45.008 33.232 43.536 35.792C42.096 38.352 40.032 40.368 37.344 41.84C34.688 43.28 31.6 44 28.08 44H14.688V10.16H28.08ZM27.36 35.696C30.112 35.696 32.272 34.944 33.84 33.44C35.408 31.936 36.192 29.808 36.192 27.056C36.192 24.272 35.408 22.128 33.84 20.624C32.272 19.088 30.112 18.32 27.36 18.32H24.096V35.696H27.36ZM54.7369 14.576C53.0729 14.576 51.7289 14.128 50.7049 13.232C49.7129 12.304 49.2169 11.152 49.2169 9.776C49.2169 8.368 49.7129 7.2 50.7049 6.272C51.7289 5.344 53.0729 4.88 54.7369 4.88C56.3689 4.88 57.6809 5.344 58.6729 6.272C59.6969 7.2 60.2089 8.368 60.2089 9.776C60.2089 11.152 59.6969 12.304 58.6729 13.232C57.6809 14.128 56.3689 14.576 54.7369 14.576ZM59.3929 17.072V44H49.9849V17.072H59.3929ZM76.2225 44.336C73.7905 44.336 71.6145 43.936 69.6945 43.136C67.8065 42.304 66.3025 41.184 65.1825 39.776C64.0945 38.336 63.4865 36.72 63.3585 34.928H72.4785C72.6065 35.792 73.0065 36.464 73.6785 36.944C74.3505 37.424 75.1825 37.664 76.1745 37.664C76.9425 37.664 77.5505 37.504 77.9985 37.184C78.4465 36.864 78.6705 36.448 78.6705 35.936C78.6705 35.264 78.3025 34.768 77.5665 34.448C76.8305 34.128 75.6145 33.776 73.9185 33.392C71.9985 33.008 70.3985 32.576 69.1185 32.096C67.8385 31.616 66.7185 30.832 65.7585 29.744C64.8305 28.656 64.3665 27.184 64.3665 25.328C64.3665 23.728 64.7985 22.288 65.6625 21.008C66.5265 19.696 67.7905 18.656 69.4545 17.888C71.1505 17.12 73.1825 16.736 75.5505 16.736C79.0705 16.736 81.8385 17.6 83.8545 19.328C85.8705 21.056 87.0385 23.328 87.3585 26.144H78.8625C78.7025 25.28 78.3185 24.624 77.7105 24.176C77.1345 23.696 76.3505 23.456 75.3585 23.456C74.5905 23.456 73.9985 23.6 73.5825 23.888C73.1985 24.176 73.0065 24.576 73.0065 25.088C73.0065 25.728 73.3745 26.224 74.1105 26.576C74.8465 26.896 76.0305 27.232 77.6625 27.584C79.6145 28 81.2305 28.464 82.5105 28.976C83.8225 29.488 84.9585 30.32 85.9185 31.472C86.9105 32.592 87.4065 34.128 87.4065 36.08C87.4065 37.648 86.9425 39.056 86.0145 40.304C85.1185 41.552 83.8225 42.544 82.1265 43.28C80.4625 43.984 78.4945 44.336 76.2225 44.336ZM101.44 20.816C102.176 19.568 103.216 18.576 104.56 17.84C105.904 17.104 107.488 16.736 109.312 16.736C111.456 16.736 113.392 17.296 115.12 18.416C116.88 19.536 118.256 21.136 119.248 23.216C120.272 25.296 120.784 27.728 120.784 30.512C120.784 33.296 120.272 35.744 119.248 37.856C118.256 39.936 116.88 41.536 115.12 42.656C113.392 43.776 111.456 44.336 109.312 44.336C107.488 44.336 105.904 43.968 104.56 43.232C103.248 42.496 102.208 41.504 101.44 40.256V56.864H92.0318V17.072H101.44V20.816ZM111.232 30.512C111.232 28.752 110.752 27.392 109.792 26.432C108.864 25.44 107.712 24.944 106.336 24.944C104.96 24.944 103.792 25.44 102.832 26.432C101.904 27.424 101.44 28.784 101.44 30.512C101.44 32.272 101.904 33.648 102.832 34.64C103.792 35.632 104.96 36.128 106.336 36.128C107.712 36.128 108.864 35.632 109.792 34.64C110.752 33.616 111.232 32.24 111.232 30.512ZM134.065 8.48V44H124.657V8.48H134.065ZM137.886 30.512C137.886 27.728 138.382 25.296 139.374 23.216C140.398 21.136 141.774 19.536 143.502 18.416C145.262 17.296 147.214 16.736 149.358 16.736C151.214 16.736 152.814 17.104 154.158 17.84C155.502 18.576 156.542 19.568 157.278 20.816V17.072H166.686V44H157.278V40.256C156.542 41.504 155.486 42.496 154.11 43.232C152.766 43.968 151.182 44.336 149.358 44.336C147.214 44.336 145.262 43.776 143.502 42.656C141.774 41.536 140.398 39.936 139.374 37.856C138.382 35.744 137.886 33.296 137.886 30.512ZM157.278 30.512C157.278 28.784 156.798 27.424 155.838 26.432C154.91 25.44 153.758 24.944 152.382 24.944C150.974 24.944 149.806 25.44 148.878 26.432C147.95 27.392 147.486 28.752 147.486 30.512C147.486 32.24 147.95 33.616 148.878 34.64C149.806 35.632 150.974 36.128 152.382 36.128C153.758 36.128 154.91 35.632 155.838 34.64C156.798 33.648 157.278 32.272 157.278 30.512ZM201.039 17.072L183.951 56.816H173.727L180.159 42.848L169.119 17.072H179.583L185.247 32.336L190.719 17.072H201.039ZM45.456 58.16L33.552 81.248V92H24.096V81.248L12.192 58.16H22.944L28.896 71.216L34.848 58.16H45.456ZM60.8723 92.336C58.1843 92.336 55.7683 91.776 53.6243 90.656C51.5123 89.536 49.8483 87.936 48.6323 85.856C47.4163 83.776 46.8083 81.328 46.8083 78.512C46.8083 75.728 47.4163 73.296 48.6323 71.216C49.8803 69.136 51.5603 67.536 53.6723 66.416C55.8163 65.296 58.2323 64.736 60.9203 64.736C63.6083 64.736 66.0083 65.296 68.1203 66.416C70.2643 67.536 71.9443 69.136 73.1603 71.216C74.4083 73.296 75.0323 75.728 75.0323 78.512C75.0323 81.296 74.4083 83.744 73.1603 85.856C71.9443 87.936 70.2643 89.536 68.1203 90.656C65.9763 91.776 63.5603 92.336 60.8723 92.336ZM60.8723 84.176C62.1843 84.176 63.2723 83.696 64.1363 82.736C65.0323 81.744 65.4803 80.336 65.4803 78.512C65.4803 76.688 65.0323 75.296 64.1363 74.336C63.2723 73.376 62.2003 72.896 60.9203 72.896C59.6403 72.896 58.5683 73.376 57.7043 74.336C56.8403 75.296 56.4083 76.688 56.4083 78.512C56.4083 80.368 56.8243 81.776 57.6562 82.736C58.4883 83.696 59.5603 84.176 60.8723 84.176ZM106.412 65.072V92H96.9559V88.16C96.1559 89.376 95.0519 90.368 93.6439 91.136C92.2359 91.872 90.6199 92.24 88.7959 92.24C85.6599 92.24 83.1799 91.216 81.3559 89.168C79.5639 87.088 78.6679 84.272 78.6679 80.72V65.072H88.0279V79.52C88.0279 81.056 88.4279 82.272 89.2279 83.168C90.0599 84.032 91.1479 84.464 92.4919 84.464C93.8679 84.464 94.9559 84.032 95.7559 83.168C96.5559 82.272 96.9559 81.056 96.9559 79.52V65.072H106.412ZM121.174 69.824C122.23 68.288 123.51 67.072 125.014 66.176C126.518 65.28 128.134 64.832 129.862 64.832V74.864H127.222C125.174 74.864 123.654 75.264 122.662 76.064C121.67 76.864 121.174 78.256 121.174 80.24V92H111.766V65.072H121.174V69.824ZM173.766 92H164.358L151.83 73.088V92H142.422V58.16H151.83L164.358 77.312V58.16H173.766V92ZM202.07 58.16V65.648H188.534V71.6H198.518V78.752H188.534V92H179.126V58.16H202.07ZM231.52 58.16V65.648H222.496V92H213.088V65.648H204.16V58.16H231.52ZM246.473 92.336C244.041 92.336 241.865 91.936 239.945 91.136C238.057 90.304 236.553 89.184 235.433 87.776C234.345 86.336 233.737 84.72 233.609 82.928H242.729C242.857 83.792 243.257 84.464 243.929 84.944C244.601 85.424 245.433 85.664 246.424 85.664C247.193 85.664 247.801 85.504 248.249 85.184C248.697 84.864 248.921 84.448 248.921 83.936C248.921 83.264 248.553 82.768 247.817 82.448C247.081 82.128 245.865 81.776 244.169 81.392C242.249 81.008 240.649 80.576 239.368 80.096C238.089 79.616 236.969 78.832 236.009 77.744C235.081 76.656 234.617 75.184 234.617 73.328C234.617 71.728 235.049 70.288 235.913 69.008C236.777 67.696 238.041 66.656 239.705 65.888C241.401 65.12 243.433 64.736 245.801 64.736C249.321 64.736 252.089 65.6 254.105 67.328C256.121 69.056 257.289 71.328 257.609 74.144H249.113C248.953 73.28 248.569 72.624 247.961 72.176C247.385 71.696 246.601 71.456 245.609 71.456C244.841 71.456 244.249 71.6 243.833 71.888C243.449 72.176 243.257 72.576 243.257 73.088C243.257 73.728 243.625 74.224 244.361 74.576C245.097 74.896 246.281 75.232 247.913 75.584C249.865 76 251.481 76.464 252.761 76.976C254.073 77.488 255.209 78.32 256.169 79.472C257.161 80.592 257.656 82.128 257.656 84.08C257.656 85.648 257.193 87.056 256.265 88.304C255.369 89.552 254.073 90.544 252.377 91.28C250.713 91.984 248.745 92.336 246.473 92.336Z"
        fill="white"
      />
      <path
        d="M28.08 10.16C31.632 10.16 34.736 10.88 37.392 12.32C40.08 13.728 42.144 15.712 43.584 18.272C45.024 20.832 45.744 23.76 45.744 27.056C45.744 30.32 45.008 33.232 43.536 35.792C42.096 38.352 40.032 40.368 37.344 41.84C34.688 43.28 31.6 44 28.08 44H14.688V10.16H28.08ZM27.36 35.696C30.112 35.696 32.272 34.944 33.84 33.44C35.408 31.936 36.192 29.808 36.192 27.056C36.192 24.272 35.408 22.128 33.84 20.624C32.272 19.088 30.112 18.32 27.36 18.32H24.096V35.696H27.36ZM54.7369 14.576C53.0729 14.576 51.7289 14.128 50.7049 13.232C49.7129 12.304 49.2169 11.152 49.2169 9.776C49.2169 8.368 49.7129 7.2 50.7049 6.272C51.7289 5.344 53.0729 4.88 54.7369 4.88C56.3689 4.88 57.6809 5.344 58.6729 6.272C59.6969 7.2 60.2089 8.368 60.2089 9.776C60.2089 11.152 59.6969 12.304 58.6729 13.232C57.6809 14.128 56.3689 14.576 54.7369 14.576ZM59.3929 17.072V44H49.9849V17.072H59.3929ZM76.2225 44.336C73.7905 44.336 71.6145 43.936 69.6945 43.136C67.8065 42.304 66.3025 41.184 65.1825 39.776C64.0945 38.336 63.4865 36.72 63.3585 34.928H72.4785C72.6065 35.792 73.0065 36.464 73.6785 36.944C74.3505 37.424 75.1825 37.664 76.1745 37.664C76.9425 37.664 77.5505 37.504 77.9985 37.184C78.4465 36.864 78.6705 36.448 78.6705 35.936C78.6705 35.264 78.3025 34.768 77.5665 34.448C76.8305 34.128 75.6145 33.776 73.9185 33.392C71.9985 33.008 70.3985 32.576 69.1185 32.096C67.8385 31.616 66.7185 30.832 65.7585 29.744C64.8305 28.656 64.3665 27.184 64.3665 25.328C64.3665 23.728 64.7985 22.288 65.6625 21.008C66.5265 19.696 67.7905 18.656 69.4545 17.888C71.1505 17.12 73.1825 16.736 75.5505 16.736C79.0705 16.736 81.8385 17.6 83.8545 19.328C85.8705 21.056 87.0385 23.328 87.3585 26.144H78.8625C78.7025 25.28 78.3185 24.624 77.7105 24.176C77.1345 23.696 76.3505 23.456 75.3585 23.456C74.5905 23.456 73.9985 23.6 73.5825 23.888C73.1985 24.176 73.0065 24.576 73.0065 25.088C73.0065 25.728 73.3745 26.224 74.1105 26.576C74.8465 26.896 76.0305 27.232 77.6625 27.584C79.6145 28 81.2305 28.464 82.5105 28.976C83.8225 29.488 84.9585 30.32 85.9185 31.472C86.9105 32.592 87.4065 34.128 87.4065 36.08C87.4065 37.648 86.9425 39.056 86.0145 40.304C85.1185 41.552 83.8225 42.544 82.1265 43.28C80.4625 43.984 78.4945 44.336 76.2225 44.336ZM101.44 20.816C102.176 19.568 103.216 18.576 104.56 17.84C105.904 17.104 107.488 16.736 109.312 16.736C111.456 16.736 113.392 17.296 115.12 18.416C116.88 19.536 118.256 21.136 119.248 23.216C120.272 25.296 120.784 27.728 120.784 30.512C120.784 33.296 120.272 35.744 119.248 37.856C118.256 39.936 116.88 41.536 115.12 42.656C113.392 43.776 111.456 44.336 109.312 44.336C107.488 44.336 105.904 43.968 104.56 43.232C103.248 42.496 102.208 41.504 101.44 40.256V56.864H92.0318V17.072H101.44V20.816ZM111.232 30.512C111.232 28.752 110.752 27.392 109.792 26.432C108.864 25.44 107.712 24.944 106.336 24.944C104.96 24.944 103.792 25.44 102.832 26.432C101.904 27.424 101.44 28.784 101.44 30.512C101.44 32.272 101.904 33.648 102.832 34.64C103.792 35.632 104.96 36.128 106.336 36.128C107.712 36.128 108.864 35.632 109.792 34.64C110.752 33.616 111.232 32.24 111.232 30.512ZM134.065 8.48V44H124.657V8.48H134.065ZM137.886 30.512C137.886 27.728 138.382 25.296 139.374 23.216C140.398 21.136 141.774 19.536 143.502 18.416C145.262 17.296 147.214 16.736 149.358 16.736C151.214 16.736 152.814 17.104 154.158 17.84C155.502 18.576 156.542 19.568 157.278 20.816V17.072H166.686V44H157.278V40.256C156.542 41.504 155.486 42.496 154.11 43.232C152.766 43.968 151.182 44.336 149.358 44.336C147.214 44.336 145.262 43.776 143.502 42.656C141.774 41.536 140.398 39.936 139.374 37.856C138.382 35.744 137.886 33.296 137.886 30.512ZM157.278 30.512C157.278 28.784 156.798 27.424 155.838 26.432C154.91 25.44 153.758 24.944 152.382 24.944C150.974 24.944 149.806 25.44 148.878 26.432C147.95 27.392 147.486 28.752 147.486 30.512C147.486 32.24 147.95 33.616 148.878 34.64C149.806 35.632 150.974 36.128 152.382 36.128C153.758 36.128 154.91 35.632 155.838 34.64C156.798 33.648 157.278 32.272 157.278 30.512ZM201.039 17.072L183.951 56.816H173.727L180.159 42.848L169.119 17.072H179.583L185.247 32.336L190.719 17.072H201.039ZM45.456 58.16L33.552 81.248V92H24.096V81.248L12.192 58.16H22.944L28.896 71.216L34.848 58.16H45.456ZM60.8723 92.336C58.1843 92.336 55.7683 91.776 53.6243 90.656C51.5123 89.536 49.8483 87.936 48.6323 85.856C47.4163 83.776 46.8083 81.328 46.8083 78.512C46.8083 75.728 47.4163 73.296 48.6323 71.216C49.8803 69.136 51.5603 67.536 53.6723 66.416C55.8163 65.296 58.2323 64.736 60.9203 64.736C63.6083 64.736 66.0083 65.296 68.1203 66.416C70.2643 67.536 71.9443 69.136 73.1603 71.216C74.4083 73.296 75.0323 75.728 75.0323 78.512C75.0323 81.296 74.4083 83.744 73.1603 85.856C71.9443 87.936 70.2643 89.536 68.1203 90.656C65.9763 91.776 63.5603 92.336 60.8723 92.336ZM60.8723 84.176C62.1843 84.176 63.2723 83.696 64.1363 82.736C65.0323 81.744 65.4803 80.336 65.4803 78.512C65.4803 76.688 65.0323 75.296 64.1363 74.336C63.2723 73.376 62.2003 72.896 60.9203 72.896C59.6403 72.896 58.5683 73.376 57.7043 74.336C56.8403 75.296 56.4083 76.688 56.4083 78.512C56.4083 80.368 56.8243 81.776 57.6562 82.736C58.4883 83.696 59.5603 84.176 60.8723 84.176ZM106.412 65.072V92H96.9559V88.16C96.1559 89.376 95.0519 90.368 93.6439 91.136C92.2359 91.872 90.6199 92.24 88.7959 92.24C85.6599 92.24 83.1799 91.216 81.3559 89.168C79.5639 87.088 78.6679 84.272 78.6679 80.72V65.072H88.0279V79.52C88.0279 81.056 88.4279 82.272 89.2279 83.168C90.0599 84.032 91.1479 84.464 92.4919 84.464C93.8679 84.464 94.9559 84.032 95.7559 83.168C96.5559 82.272 96.9559 81.056 96.9559 79.52V65.072H106.412ZM121.174 69.824C122.23 68.288 123.51 67.072 125.014 66.176C126.518 65.28 128.134 64.832 129.862 64.832V74.864H127.222C125.174 74.864 123.654 75.264 122.662 76.064C121.67 76.864 121.174 78.256 121.174 80.24V92H111.766V65.072H121.174V69.824ZM173.766 92H164.358L151.83 73.088V92H142.422V58.16H151.83L164.358 77.312V58.16H173.766V92ZM202.07 58.16V65.648H188.534V71.6H198.518V78.752H188.534V92H179.126V58.16H202.07ZM231.52 58.16V65.648H222.496V92H213.088V65.648H204.16V58.16H231.52ZM246.473 92.336C244.041 92.336 241.865 91.936 239.945 91.136C238.057 90.304 236.553 89.184 235.433 87.776C234.345 86.336 233.737 84.72 233.609 82.928H242.729C242.857 83.792 243.257 84.464 243.929 84.944C244.601 85.424 245.433 85.664 246.424 85.664C247.193 85.664 247.801 85.504 248.249 85.184C248.697 84.864 248.921 84.448 248.921 83.936C248.921 83.264 248.553 82.768 247.817 82.448C247.081 82.128 245.865 81.776 244.169 81.392C242.249 81.008 240.649 80.576 239.368 80.096C238.089 79.616 236.969 78.832 236.009 77.744C235.081 76.656 234.617 75.184 234.617 73.328C234.617 71.728 235.049 70.288 235.913 69.008C236.777 67.696 238.041 66.656 239.705 65.888C241.401 65.12 243.433 64.736 245.801 64.736C249.321 64.736 252.089 65.6 254.105 67.328C256.121 69.056 257.289 71.328 257.609 74.144H249.113C248.953 73.28 248.569 72.624 247.961 72.176C247.385 71.696 246.601 71.456 245.609 71.456C244.841 71.456 244.249 71.6 243.833 71.888C243.449 72.176 243.257 72.576 243.257 73.088C243.257 73.728 243.625 74.224 244.361 74.576C245.097 74.896 246.281 75.232 247.913 75.584C249.865 76 251.481 76.464 252.761 76.976C254.073 77.488 255.209 78.32 256.169 79.472C257.161 80.592 257.656 82.128 257.656 84.08C257.656 85.648 257.193 87.056 256.265 88.304C255.369 89.552 254.073 90.544 252.377 91.28C250.713 91.984 248.745 92.336 246.473 92.336Z"
        fill="url(#paint0_linear_279_54)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_279_54"
        x="0.191895"
        y="0.879883"
        width="269.464"
        height="111.456"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="8" />
        <feGaussianBlur stdDeviation="6" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_279_54"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_279_54"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_279_54"
        x1="37.0952"
        y1="21"
        x2="212.177"
        y2="147.118"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#A7CDE0" />
        <stop offset="0.494792" stop-color="#E6EEC8" />
        <stop offset="1" stop-color="#DFE8EE" />
      </linearGradient>
    </defs>
  </svg>
);
const CardTitleEN = styled(_CardTitleEN)`
  margin: -8px -16px;
  position: absolute;
  top: 32px;
  left: 32px;

  @media (max-width: 1268px) {
    transform: scale(0.85);
    transform-origin: top left;
  }

  @media (max-width: 735px) {
    transform: scale(1);
  }

  @media (max-width: 480px) {
    transform: scale(0.85);
  }
`;
const CardTitleKO = styled.h3`
  position: absolute;
  top: 32px;
  left: 32px;

  font-weight: 900;
  font-size: 48px;
  line-height: 100%;

  color: #e6eec8;
  background: linear-gradient(
      105.58deg,
      #a7cde0 12%,
      #e6eec8 53.49%,
      #dfe8ee 95.85%
    ),
    #ffffff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  /* shadow-default */

  text-shadow: 0px 8px 12px rgba(0, 0, 0, 0.18);

  @media (max-width: 1268px) {
    font-size: 40px;
  }

  @media (max-width: 735px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

const IllustContainer = styled(motion.div)`
  position: absolute;
  top: 118px;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const AvatarNFT = styled(Image)`
  margin: -24px;
  width: ${196 + 48}px;
  height: ${196 + 48}px;
`;
const CollectionName: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="130"
    height="32"
    viewBox="0 0 130 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.86175 16.004C0.86175 14.34 1.20575 12.86 1.89375 11.564C2.59775 10.252 3.58975 9.236 4.86975 8.516C6.14975 7.78 7.62175 7.412 9.28575 7.412C11.3978 7.412 13.1738 7.98 14.6138 9.116C16.0538 10.236 16.9818 11.764 17.3978 13.7H12.3338C12.0298 13.06 11.6058 12.572 11.0618 12.236C10.5338 11.9 9.91775 11.732 9.21375 11.732C8.12575 11.732 7.25375 12.124 6.59775 12.908C5.95775 13.676 5.63775 14.708 5.63775 16.004C5.63775 17.316 5.95775 18.364 6.59775 19.148C7.25375 19.916 8.12575 20.3 9.21375 20.3C9.91775 20.3 10.5338 20.132 11.0618 19.796C11.6058 19.46 12.0298 18.972 12.3338 18.332H17.3978C16.9818 20.268 16.0538 21.804 14.6138 22.94C13.1738 24.06 11.3978 24.62 9.28575 24.62C7.62175 24.62 6.14975 24.26 4.86975 23.54C3.58975 22.804 2.59775 21.788 1.89375 20.492C1.20575 19.18 0.86175 17.684 0.86175 16.004ZM24.3293 6.74V24.5H19.6253V6.74H24.3293ZM33.2721 24.668C31.9281 24.668 30.7201 24.388 29.6481 23.828C28.5921 23.268 27.7601 22.468 27.1521 21.428C26.5441 20.388 26.2401 19.164 26.2401 17.756C26.2401 16.364 26.5441 15.148 27.1521 14.108C27.7761 13.068 28.6161 12.268 29.6721 11.708C30.7441 11.148 31.9521 10.868 33.2961 10.868C34.6401 10.868 35.8401 11.148 36.8961 11.708C37.9681 12.268 38.8081 13.068 39.4161 14.108C40.0401 15.148 40.3521 16.364 40.3521 17.756C40.3521 19.148 40.0401 20.372 39.4161 21.428C38.8081 22.468 37.9681 23.268 36.8961 23.828C35.8241 24.388 34.6161 24.668 33.2721 24.668ZM33.2721 20.588C33.9281 20.588 34.4721 20.348 34.9041 19.868C35.3521 19.372 35.5761 18.668 35.5761 17.756C35.5761 16.844 35.3521 16.148 34.9041 15.668C34.4721 15.188 33.9361 14.948 33.2961 14.948C32.6561 14.948 32.1201 15.188 31.6881 15.668C31.2561 16.148 31.0401 16.844 31.0401 17.756C31.0401 18.684 31.2481 19.388 31.6641 19.868C32.0801 20.348 32.6161 20.588 33.2721 20.588ZM51.0739 10.916C52.6259 10.916 53.8579 11.436 54.7699 12.476C55.6819 13.5 56.1379 14.892 56.1379 16.652V24.5H51.4339V17.276C51.4339 16.508 51.2339 15.908 50.8339 15.476C50.4339 15.028 49.8979 14.804 49.2259 14.804C48.5219 14.804 47.9699 15.028 47.5699 15.476C47.1699 15.908 46.9699 16.508 46.9699 17.276V24.5H42.2659V11.036H46.9699V12.956C47.3859 12.348 47.9459 11.86 48.6499 11.492C49.3539 11.108 50.1619 10.916 51.0739 10.916ZM71.583 17.612C71.583 17.98 71.559 18.348 71.511 18.716H62.607C62.655 19.452 62.855 20.004 63.207 20.372C63.575 20.724 64.039 20.9 64.599 20.9C65.383 20.9 65.943 20.548 66.279 19.844H71.295C71.087 20.772 70.679 21.604 70.071 22.34C69.479 23.06 68.727 23.628 67.815 24.044C66.903 24.46 65.895 24.668 64.791 24.668C63.463 24.668 62.279 24.388 61.239 23.828C60.215 23.268 59.407 22.468 58.815 21.428C58.239 20.388 57.951 19.164 57.951 17.756C57.951 16.348 58.239 15.132 58.815 14.108C59.391 13.068 60.191 12.268 61.215 11.708C62.255 11.148 63.447 10.868 64.791 10.868C66.119 10.868 67.295 11.14 68.319 11.684C69.343 12.228 70.143 13.012 70.719 14.036C71.295 15.044 71.583 16.236 71.583 17.612ZM66.783 16.436C66.783 15.86 66.591 15.412 66.207 15.092C65.823 14.756 65.343 14.588 64.767 14.588C64.191 14.588 63.719 14.748 63.351 15.068C62.983 15.372 62.743 15.828 62.631 16.436H66.783ZM84.0921 24.5L80.8041 19.724L77.9961 24.5H72.6441L78.1401 15.836L72.4521 7.58H77.9961L81.1881 12.236L83.9241 7.58H89.2761L83.8521 16.1L89.6361 24.5H84.0921Z"
      fill="#9EDBF5"
    />
    <g clipPath="url(#clip0_293_3304)">
      <path
        d="M130 16C130 20.2435 128.314 24.3131 125.314 27.3137C122.313 30.3143 118.243 32 114 32C109.757 32 105.687 30.3143 102.686 27.3137C99.6857 24.3131 98 20.2435 98 16C98 11.7565 99.6857 7.68687 102.686 4.68629C105.687 1.68571 109.757 0 114 0C118.243 0 122.313 1.68571 125.314 4.68629C128.314 7.68687 130 11.7565 130 16V16ZM122.06 9.94C121.917 9.79764 121.747 9.68555 121.56 9.61043C121.373 9.53531 121.172 9.49872 120.971 9.50282C120.769 9.50693 120.57 9.55166 120.386 9.63434C120.202 9.71701 120.037 9.83594 119.9 9.984L112.954 18.834L108.768 14.646C108.484 14.381 108.108 14.2368 107.719 14.2437C107.33 14.2505 106.96 14.4079 106.685 14.6828C106.41 14.9576 106.253 15.3284 106.246 15.717C106.239 16.1056 106.383 16.4817 106.648 16.766L111.94 22.06C112.083 22.2023 112.252 22.3144 112.439 22.3897C112.626 22.465 112.826 22.5018 113.027 22.4981C113.229 22.4944 113.427 22.4501 113.611 22.368C113.795 22.2858 113.961 22.1675 114.098 22.02L122.082 12.04C122.354 11.757 122.505 11.3786 122.501 10.9859C122.497 10.5933 122.34 10.2178 122.062 9.94H122.06Z"
        fill="#9FDBF5"
      />
    </g>
    <defs>
      <clipPath id="clip0_293_3304">
        <rect width="32" height="32" fill="white" transform="translate(98)" />
      </clipPath>
    </defs>
  </svg>
);
